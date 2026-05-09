import { describe, expect, it } from 'vitest';

import {
  AuthenticationError,
  ConflictError,
  InternalServerError,
  NotFoundError,
  RateLimitError,
  UnknownAPIError,
  mapResponseToError,
} from '@/core/errors';

function jsonResponse(status: number, body: unknown, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });
}

describe('mapResponseToError', () => {
  it('maps 401 to AuthenticationError with code + requestId', async () => {
    const res = jsonResponse(401, {
      error: 'AUTH_INVALID_TOKEN',
      message: 'Bad token',
      status: 401,
      requestId: 'req_xyz',
    }, { 'x-request-id': 'req_xyz' });

    const err = await mapResponseToError(res, 'https://api/v1/me');
    expect(err).toBeInstanceOf(AuthenticationError);
    expect(err.code).toBe('AUTH_INVALID_TOKEN');
    expect(err.status).toBe(401);
    expect(err.requestId).toBe('req_xyz');
  });

  it('maps 404 to NotFoundError', async () => {
    const err = await mapResponseToError(jsonResponse(404, { message: 'gone' }), 'u');
    expect(err).toBeInstanceOf(NotFoundError);
    expect(err.status).toBe(404);
  });

  it('maps 409 to ConflictError', async () => {
    const err = await mapResponseToError(jsonResponse(409, { error: 'IDEMPOTENCY_KEY_COLLISION', message: 'nope' }), 'u');
    expect(err).toBeInstanceOf(ConflictError);
    expect(err.code).toBe('IDEMPOTENCY_KEY_COLLISION');
  });

  it('parses Retry-After seconds into retryAfterMs on 429', async () => {
    const res = jsonResponse(429, { error: 'RATE_LIMITED', message: 'slow down' }, { 'retry-after': '5' });
    const err = await mapResponseToError(res, 'u');
    expect(err).toBeInstanceOf(RateLimitError);
    expect(err.retryAfterMs).toBe(5_000);
  });

  it('parses retryAfter from JSON body when header absent', async () => {
    const res = jsonResponse(429, { error: 'RATE_LIMITED', message: 'slow down', retryAfter: 3 });
    const err = await mapResponseToError(res, 'u');
    expect(err).toBeInstanceOf(RateLimitError);
    expect(err.retryAfterMs).toBe(3_000);
  });

  it('maps 500 to InternalServerError', async () => {
    const err = await mapResponseToError(jsonResponse(500, { message: 'boom' }), 'u');
    expect(err).toBeInstanceOf(InternalServerError);
  });

  it('maps unknown statuses to UnknownAPIError', async () => {
    const err = await mapResponseToError(jsonResponse(418, { message: 'tea' }), 'u');
    expect(err).toBeInstanceOf(UnknownAPIError);
    expect(err.status).toBe(418);
  });

  it('preserves details when present', async () => {
    const err = await mapResponseToError(jsonResponse(422, {
      error: 'VALIDATION_FAILED',
      message: 'bad',
      details: [{ path: 'key', message: 'required' }],
    }), 'u');
    expect(err.details).toEqual([{ path: 'key', message: 'required' }]);
  });

  it('survives a non-JSON body', async () => {
    const res = new Response('<html>500</html>', { status: 500, headers: { 'content-type': 'text/html' } });
    const err = await mapResponseToError(res, 'u');
    expect(err).toBeInstanceOf(InternalServerError);
    expect(err.code).toBeNull();
  });
});
