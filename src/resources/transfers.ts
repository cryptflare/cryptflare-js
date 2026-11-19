import { APIResource } from './api-resource'
import type {
  AcceptTransferResponse,
  DeclineTransferResponse,
  IncomingTransfersResponse,
  RequestOptions,
  TransferTokenInput,
} from '../types'

/**
 * Incoming organisation ownership transfers (recipient side). The
 * `organisations.initiateTransfer` / `getTransfer` / `cancelTransfer`
 * methods cover the sender side.
 *
 * All three methods need a user session: the API matches transfers to
 * the signed-in user's email, so service tokens cannot accept them.
 */
export class Transfers extends APIResource {
  /**
   * Lists pending, unexpired transfers addressed to the current user.
   * `GET /v1/auth/transfers/pending`. Requires an authenticated user session (no org permission).
   */
  pending(options?: RequestOptions): Promise<IncomingTransfersResponse> {
    return this.request<IncomingTransfersResponse>(
      { method: 'GET', path: '/v1/auth/transfers/pending' },
      options,
    )
  }

  /**
   * Accepts a transfer with the token from the invitation email. The caller becomes the owner.
   * `POST /v1/auth/transfer/accept`. Requires an authenticated user session whose email matches the transfer.
   */
  accept(input: TransferTokenInput, options?: RequestOptions): Promise<AcceptTransferResponse> {
    return this.request<AcceptTransferResponse>(
      { method: 'POST', path: '/v1/auth/transfer/accept', body: { token: input.token } },
      options,
    )
  }

  /**
   * Declines a transfer with the token from the invitation email.
   * `POST /v1/auth/transfer/decline`. Requires an authenticated user session whose email matches the transfer.
   */
  decline(input: TransferTokenInput, options?: RequestOptions): Promise<DeclineTransferResponse> {
    return this.request<DeclineTransferResponse>(
      { method: 'POST', path: '/v1/auth/transfer/decline', body: { token: input.token } },
      options,
    )
  }
}
