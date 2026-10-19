declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    ASSETS: Fetcher;
    ACCESS_TEAM_DOMAIN?: string;
    ACCESS_AUD?: string;
    EREM_ALLOWED_EMAILS?: string;
    EREM_ACCESS_MODE?: string;
    SUPABASE_URL?: string;
    SUPABASE_PUBLISHABLE_KEY?: string;
    TURNSTILE_SITE_KEY?: string;
    TURNSTILE_SECRET_KEY?: string;
    SUPABASE_CAPTCHA_ENABLED?: string;
  }
}
