/**
 * Single source of truth for the SDK version. Mirrored into the User-Agent
 * header on every request and re-exported as `version` from the public
 * barrel. Bumped via changesets when the SDK ships a release.
 */
export const VERSION = '0.3.0';
