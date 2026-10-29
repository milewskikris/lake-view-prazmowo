import "server-only";

/**
 * Prosty limiter w pamięci instancji funkcji (okno przesuwne).
 * Na Vercel każda instancja ma własną pamięć, więc to ochrona podstawowa.
 * Do twardego limitu globalnego podłącz np. Upstash Redis (Vercel Marketplace).
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

export function rateLimit(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return true;
}
