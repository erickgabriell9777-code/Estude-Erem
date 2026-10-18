declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    ASSETS: Fetcher;
    ACCESS_TEAM_DOMAIN?: string;
    ACCESS_AUD?: string;
    EREM_ALLOWED_EMAILS?: string;
  }
}
