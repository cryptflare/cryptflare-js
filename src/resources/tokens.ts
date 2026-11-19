import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type {
  ClaimLink,
  ClaimedToken,
  CreateClaimLinkInput,
  CreateTokenInput,
  CreatedTokenResponse,
  RedeemClaimInput,
  TokenItemResponse,
  TokenListResponse,
  TokenSuccessResponse,
} from '../types'

type OrgInput = { organisation?: string }
const base = (org: string) => `/v1/organisations/${enc(org)}/tokens`

/** Personal access tokens. Mounted at `/v1/organisations/:org/tokens`. */
export class Tokens extends APIResource {
  /** `GET /v1/organisations/:org/tokens`. Requires `tokens:read`. */
  list(input: OrgInput = {}, options?: RequestOptions): Promise<TokenListResponse['data']> {
    return this.requestData<TokenListResponse['data']>(
      { method: 'GET', path: base(this.resolveOrg(input)) },
      options,
    )
  }

  /**
   * Creates an access token scoped to one workspace. The full token is
   * returned once. `ipAllowlist` (max 50 IPv4 / IPv6 / CIDR entries) makes
   * requests from outside the list fail with 403 ACCESS_TOKEN_IP_BLOCKED.
   * `POST /v1/organisations/:org/tokens`. Requires `tokens:create`.
   */
  create(
    input: OrgInput & CreateTokenInput,
    options?: RequestOptions,
  ): Promise<CreatedTokenResponse['data']> {
    const org = this.resolveOrg(input)
    const body: Record<string, unknown> = {
      name: input.name,
      workspaceId: input.workspaceId,
      scopes: input.scopes,
      environment: input.environment,
    }
    if (input.expiresAt !== undefined) body['expiresAt'] = input.expiresAt
    if (input.ipAllowlist !== undefined) body['ipAllowlist'] = input.ipAllowlist
    return this.requestData<CreatedTokenResponse['data']>(
      { method: 'POST', path: base(org), body },
      options,
    )
  }

  /** `PATCH /v1/organisations/:org/tokens/:tokenId`. Requires `tokens:create`. */
  update(
    input: OrgInput & {
      tokenId: string
      name?: string
      scopes?: string[]
      /** Pass null to clear an existing allowlist; omit to leave unchanged. */
      ipAllowlist?: string[] | null
    },
    options?: RequestOptions,
  ): Promise<TokenItemResponse['data']> {
    const org = this.resolveOrg(input)
    const body: Record<string, unknown> = {}
    if (input.name !== undefined) body['name'] = input.name
    if (input.scopes !== undefined) body['scopes'] = input.scopes
    if (input.ipAllowlist !== undefined) body['ipAllowlist'] = input.ipAllowlist
    return this.requestData<TokenItemResponse['data']>(
      { method: 'PATCH', path: `${base(org)}/${enc(input.tokenId)}`, body },
      options,
    )
  }

  /** `POST /v1/organisations/:org/tokens/:tokenId/toggle`. Requires `tokens:create`. */
  toggle(
    input: OrgInput & { tokenId: string; enabled: boolean },
    options?: RequestOptions,
  ): Promise<TokenSuccessResponse> {
    const org = this.resolveOrg(input)
    return this.request<TokenSuccessResponse>(
      {
        method: 'POST',
        path: `${base(org)}/${enc(input.tokenId)}/toggle`,
        body: { enabled: input.enabled },
      },
      options,
    )
  }

  /** `DELETE /v1/organisations/:org/tokens/:tokenId`. Requires `tokens:revoke`. */
  revoke(input: OrgInput & { tokenId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input)
    return this.request<void>(
      {
        method: 'DELETE',
        path: `${base(org)}/${enc(input.tokenId)}`,
      },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/tokens/claim-links` - creates a one-time URL
   * a recipient opens to mint a workspace token. Requires `tokens:create`.
   */
  createClaimLink(
    input: OrgInput & CreateClaimLinkInput,
    options?: RequestOptions,
  ): Promise<ClaimLink> {
    const { organisation: _o, ...body } = input
    void _o
    return this.requestData<ClaimLink>(
      {
        method: 'POST',
        path: `${base(this.resolveOrg(input))}/claim-links`,
        body,
      },
      options,
    )
  }

  /** `POST /v1/tokens/claim` - redeems a one-time claim code for the token. No authentication required. */
  redeemClaim(body: RedeemClaimInput, options?: RequestOptions): Promise<ClaimedToken> {
    return this.requestData<ClaimedToken>(
      { method: 'POST', path: '/v1/tokens/claim', body },
      options,
    )
  }
}
