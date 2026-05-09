/**
 * Minimal fetch test double. Records every call and replays a queue of
 * scripted responses. The SDK is built on top of `globalThis.fetch` and
 * accepts a `fetch` override, so every test injects an instance of this
 * helper rather than monkey-patching globals.
 */
export type ScriptedResponse = {
  status: number;
  body?: unknown;
  headers?: Record<string, string>;
};

export type RecordedRequest = {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
};

export function makeFetchMock(scripts: ScriptedResponse[]): {
  fetch: typeof fetch;
  calls: RecordedRequest[];
} {
  const queue = [...scripts];
  const calls: RecordedRequest[] = [];

  const impl: typeof fetch = async (input, init) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : (input as Request).url;
    const method = (init?.method ?? 'GET').toUpperCase();
    const headers: Record<string, string> = {};
    const rawHeaders = init?.headers;
    if (rawHeaders instanceof Headers) {
      rawHeaders.forEach((value, key) => { headers[key.toLowerCase()] = value; });
    } else if (Array.isArray(rawHeaders)) {
      for (const [k, v] of rawHeaders) headers[String(k).toLowerCase()] = String(v);
    } else if (rawHeaders && typeof rawHeaders === 'object') {
      for (const [k, v] of Object.entries(rawHeaders)) headers[k.toLowerCase()] = String(v);
    }
    const body = typeof init?.body === 'string' ? init.body : undefined;
    const recorded: RecordedRequest = { url, method, headers };
    if (body !== undefined) recorded.body = body;
    calls.push(recorded);

    const next = queue.shift();
    if (!next) {
      throw new Error(`fetch-mock: no scripted response for ${method} ${url}`);
    }

    const responseHeaders = new Headers({ 'content-type': 'application/json', ...(next.headers ?? {}) });
    const text = next.body === undefined ? '' : JSON.stringify(next.body);
    return new Response(text, { status: next.status, headers: responseHeaders });
  };

  return { fetch: impl, calls };
}
