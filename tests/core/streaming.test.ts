import { describe, expect, it } from 'vitest';

import { EventStream } from '@/core/event-stream';
import { ConnectionError } from '@/core/errors';
import { parseSSE, type ServerEvent } from '@/core/streaming';

function makeStream(chunks: string[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
      controller.close();
    },
  });
}

async function collect(stream: ReadableStream<Uint8Array>): Promise<ServerEvent[]> {
  const out: ServerEvent[] = [];
  for await (const event of parseSSE(stream)) out.push(event);
  return out;
}

describe('parseSSE', () => {
  it('parses a single event with default name', async () => {
    const events = await collect(makeStream(['data: hello\n\n']));
    expect(events).toEqual([{ event: 'message', data: 'hello' }]);
  });

  it('parses a named event with id and retry', async () => {
    const events = await collect(makeStream([
      'event: audit\nid: 42\nretry: 1500\ndata: {"slug":"X"}\n\n',
    ]));
    expect(events).toEqual([
      { event: 'audit', data: '{"slug":"X"}', id: '42', retry: 1500 },
    ]);
  });

  it('joins multi-line data with newline', async () => {
    const events = await collect(makeStream(['data: line one\ndata: line two\n\n']));
    expect(events[0]?.data).toBe('line one\nline two');
  });

  it('drops comment lines starting with `:`', async () => {
    const events = await collect(makeStream([': keep-alive\ndata: ok\n\n']));
    expect(events).toEqual([{ event: 'message', data: 'ok' }]);
  });

  it('handles fragmented chunks across read boundaries', async () => {
    const events = await collect(makeStream([
      'data: ',
      'partial',
      ' payload\n',
      '\n',
      'event: tick\n',
      'data: 1\n\n',
    ]));
    expect(events).toEqual([
      { event: 'message', data: 'partial payload' },
      { event: 'tick', data: '1' },
    ]);
  });

  it('flushes a final frame without trailing blank line', async () => {
    const events = await collect(makeStream(['data: tail']));
    expect(events).toEqual([{ event: 'message', data: 'tail' }]);
  });

  it('strips a single leading space from the value', async () => {
    const events = await collect(makeStream(['data:nospace\n\ndata: withspace\n\n']));
    expect(events.map((e) => e.data)).toEqual(['nospace', 'withspace']);
  });

  it('normalises CRLF to LF', async () => {
    const events = await collect(makeStream(['data: hello\r\n\r\n']));
    expect(events).toEqual([{ event: 'message', data: 'hello' }]);
  });

  it('throws ConnectionError when the underlying read fails', async () => {
    const stream = new ReadableStream({
      start(controller) {
        controller.error(new Error('boom'));
      },
    });
    await expect(collect(stream)).rejects.toBeInstanceOf(ConnectionError);
  });
});

describe('EventStream', () => {
  type Tick = { n: number };

  it('maps server events to typed values via parse hook', async () => {
    const stream = makeStream(['event: tick\ndata: {"n":1}\n\nevent: tick\ndata: {"n":2}\n\n']);
    const es = new EventStream<Tick>(stream, {
      parse: (event) => (event.event === 'tick' ? (JSON.parse(event.data) as Tick) : null),
    });
    const out: Tick[] = [];
    for await (const tick of es) out.push(tick);
    expect(out).toEqual([{ n: 1 }, { n: 2 }]);
  });

  it('skips events whose parser returns null', async () => {
    const stream = makeStream([
      'event: heartbeat\ndata: alive\n\n',
      'event: tick\ndata: {"n":1}\n\n',
    ]);
    const es = new EventStream<Tick>(stream, {
      parse: (event) => (event.event === 'tick' ? (JSON.parse(event.data) as Tick) : null),
    });
    const out: Tick[] = [];
    for await (const tick of es) out.push(tick);
    expect(out).toEqual([{ n: 1 }]);
  });

  it('records lastEventId for resume', async () => {
    const stream = makeStream(['id: 7\ndata: hi\n\nid: 8\ndata: again\n\n']);
    const es = new EventStream<string>(stream, { parse: (event) => event.data });
    const out: string[] = [];
    for await (const item of es) out.push(item);
    expect(out).toEqual(['hi', 'again']);
    expect(es.lastEventId).toBe('8');
  });

  it('aborts via AbortSignal and stops iteration', async () => {
    const controller = new AbortController();
    const stream = new ReadableStream<Uint8Array>({
      start(c) {
        const enc = new TextEncoder();
        c.enqueue(enc.encode('data: 1\n\n'));
        // Leave the stream open; abort fires below.
        setTimeout(() => {
          try { c.enqueue(enc.encode('data: 2\n\n')); c.close(); } catch { /* ignore */ }
        }, 50);
      },
    });
    const es = new EventStream<string>(stream, {
      parse: (event) => event.data,
      signal: controller.signal,
    });
    const iter = es[Symbol.asyncIterator]();
    const first = await iter.next();
    expect(first.value).toBe('1');
    controller.abort();
    const second = await iter.next();
    expect(second.done).toBe(true);
  });
});
