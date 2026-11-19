/** Public types backed by the vendored `transfers` schemas. */
import type {
  AcceptTransferResponse as _AcceptTransferResponse,
  DeclineTransferResponse as _DeclineTransferResponse,
  IncomingTransfersResponse as _IncomingTransfersResponse,
  InitiateTransferResponse as _SDK_InitiateTransferResponse,
  TransferStatusResponse as _SDK_TransferStatusResponse,
  TransferTokenInput as _TransferTokenInput,
} from '../_vendored/schemas/transfers'

export type TransferTokenInput = _TransferTokenInput
export type IncomingTransfersResponse = _IncomingTransfersResponse
export type AcceptTransferResponse = _AcceptTransferResponse
export type DeclineTransferResponse = _DeclineTransferResponse
export type InitiateTransferResponse = _SDK_InitiateTransferResponse
export type TransferStatusResponse = _SDK_TransferStatusResponse
