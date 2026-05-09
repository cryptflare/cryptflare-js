import { ConnectionError } from './errors';

export type ServerEvent = {
  /** SSE `event:` field. Defaults to `'message'` per the spec. */
  event: string;
  /** SSE `data:` field, joined with `\n` when multiple lines were emitted. */
  data: string;
  /** SSE `id:` field, when present. Forwarded as `Last-Event-ID` on resume. */
  id?: string;
  /** SSE `retry:` field in ms, when present. Caller decides whether to honour. */
  retry?: number;
};

/**
 * Parses an SSE-formatted `ReadableStream` into typed events. Buffers
 * partial chunks across `read()` calls because event boundaries (`\n\n`)
 * frequently span multiple network packets. Comment lines (starting with
 * `:`) and unknown fields are dropped per the W3C spec.
 *
 * The parser closes its reader on the first error so a single malformed
 * payload does not leak file descriptors. Network failures mid-stream
 * surface as `ConnectionError` from the iterator.
 */
export async function* parseSSE(stream: ReadableStream<Uint8Array>): AsyncGenerator<ServerEvent> {
  const reader = stream.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  try {
    while (true) {
      const { value, done } = await reader.read().catch((cause) => {
        throw new ConnectionError('Stream read failed.', cause);
      });
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // Normalise CRLF and lone CR to LF so the boundary regex stays simple.
      buffer = buffer.replace(/\r\n|\r/g, '\n');

      let boundary = buffer.indexOf('\n\n');
      while (boundary !== -1) {
        const raw = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);
        const event = parseFrame(raw);
        if (event !== null) yield event;
        boundary = buffer.indexOf('\n\n');
      }
    }

    // Flush any final frame that was not terminated by a blank line. Some
    // servers omit the trailing `\n\n` on the last event; honour it so
    // callers do not lose the closing payload.
    const tail = buffer.trim();
    if (tail.length > 0) {
      const event = parseFrame(tail);
      if (event !== null) yield event;
    }
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // Lock release on an already-cancelled reader throws; safe to ignore.
    }
  }
}

function parseFrame(raw: string): ServerEvent | null {
  const lines = raw.split('\n');
  let event = 'message';
  let id: string | undefined;
  let retry: number | undefined;
  const dataLines: string[] = [];
  let hasField = false;

  for (const line of lines) {
    if (line.length === 0 || line.startsWith(':')) continue;

    const colon = line.indexOf(':');
    const field = colon === -1 ? line : line.slice(0, colon);
    let value = colon === -1 ? '' : line.slice(colon + 1);
    // Spec: a single leading space is stripped from the value.
    if (value.startsWith(' ')) value = value.slice(1);

    switch (field) {
      case 'event':
        event = value;
        hasField = true;
        break;
      case 'data':
        dataLines.push(value);
        hasField = true;
        break;
      case 'id':
        // Null bytes invalidate the id per spec.
        if (!value.includes('\0')) id = value;
        hasField = true;
        break;
      case 'retry': {
        const parsed = Number(value);
        if (Number.isFinite(parsed) && parsed >= 0) retry = parsed;
        hasField = true;
        break;
      }
      default:
        // Unknown fields ignored per spec.
        break;
    }
  }

  if (!hasField) return null;
  return {
    event,
    data: dataLines.join('\n'),
    ...(id !== undefined ? { id } : {}),
    ...(retry !== undefined ? { retry } : {}),
  };
}
