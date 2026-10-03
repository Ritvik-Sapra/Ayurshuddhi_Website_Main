import "server-only";

/** Simple in-memory limiter: max 5 submissions per IP per 10 minutes. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

/**
 * TODO(spam): in-memory state resets on every serverless cold start and is not shared
 * between instances. Move to Upstash/Redis (or Cloudflare Turnstile) before launch.
 */
export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

export function clientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

/**
 * TODO(spam): verify a Cloudflare Turnstile token here once TURNSTILE_SECRET_KEY is set:
 * POST https://challenges.cloudflare.com/turnstile/v0/siteverify
 */
export async function verifyTurnstile(): Promise<boolean> {
  return true;
}
