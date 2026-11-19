import { describe, expect, it } from 'vitest'

import {
  ConnectionError,
  CryptFlare,
  EnvelopeError,
  LocalKeyring,
  RequestAbortedError,
  UnknownAPIError,
  unseal,
} from '@/index'
import { defaultShouldRetry } from '@/core/retry'

function clientWith(
  response: () => Response | Promise<Response>,
  retry: false | undefined = false,
) {
  const f: typeof fetch = async () => response()
  return new CryptFlare({
    apiKey: 'cf_pat_abc',
    fetch: f,
    ...(retry === false ? { retry: false } : {}),
  })
}

describe('response parsing', () => {
  it('throws UnknownAPIError when a 2xx body is HTML (proxy page)', async () => {
    const client = clientWith(
      () =>
        new Response('<html>login</html>', {
          status: 200,
          headers: { 'content-type': 'text/html' },
        }),
    )
    await expect(client.request({ method: 'GET', path: '/v1/status' })).rejects.toBeInstanceOf(
      UnknownAPIError,
    )
  })

  it('throws UnknownAPIError on malformed JSON instead of a SyntaxError', async () => {
    const client = clientWith(
      () =>
        new Response('{"oops"', { status: 200, headers: { 'content-type': 'application/json' } }),
    )
    const err = await client.request({ method: 'GET', path: '/v1/status' }).catch((e: unknown) => e)
    expect(err).toBeInstanceOf(UnknownAPIError)
    expect((err as UnknownAPIError).status).toBe(200)
  })

  it('returns plain text bodies as strings', async () => {
    const client = clientWith(
      () => new Response('a: 1\n', { status: 200, headers: { 'content-type': 'text/plain' } }),
    )
    await expect(client.request<string>({ method: 'GET', path: '/v1/x' })).resolves.toBe('a: 1\n')
  })

  it('returns undefined for an empty 2xx body', async () => {
    const client = clientWith(() => new Response(null, { status: 204 }))
    await expect(client.request({ method: 'DELETE', path: '/v1/x' })).resolves.toBeUndefined()
  })
})

describe('caller aborts', () => {
  it('maps a caller abort to RequestAbortedError and does not retry', async () => {
    let calls = 0
    const f: typeof fetch = (_input, init) => {
      calls += 1
      return new Promise((_resolve, reject) => {
        if (init?.signal?.aborted) return reject(new DOMException('aborted', 'AbortError'))
        init?.signal?.addEventListener('abort', () =>
          reject(new DOMException('aborted', 'AbortError')),
        )
      })
    }
    const client = new CryptFlare({ apiKey: 'cf_pat_abc', fetch: f })
    const controller = new AbortController()
    const pending = client.request(
      { method: 'GET', path: '/v1/status' },
      { signal: controller.signal },
    )
    controller.abort(new Error('user cancelled'))
    const err = await pending.catch((e: unknown) => e)
    expect(err).toBeInstanceOf(RequestAbortedError)
    expect(err).not.toBeInstanceOf(ConnectionError)
    expect(calls).toBe(1)
  })

  it('is never retried by the default policy', () => {
    expect(defaultShouldRetry(new RequestAbortedError('x'))).toBe(false)
  })
})

describe('envelope errors', () => {
  it('throws EnvelopeError for a malformed envelope', async () => {
    const keyring = new LocalKeyring({ masterKey: new Uint8Array(32), kid: 'A' })
    await expect(unseal('cfenv:v1:{"version":1}', keyring)).rejects.toBeInstanceOf(EnvelopeError)
    await expect(unseal('cfenv:v1:not-json', keyring)).rejects.toBeInstanceOf(EnvelopeError)
    await expect(unseal('plain', keyring)).rejects.toBeInstanceOf(EnvelopeError)
  })
})
