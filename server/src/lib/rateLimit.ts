interface Bucket {
  count: number
  resetAt: number
}

const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS = 5

const buckets = new Map<string, Bucket>()

export function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const bucket = buckets.get(ip)

  if (!bucket || now > bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  bucket.count += 1
  return bucket.count > MAX_REQUESTS
}

// Periodically clear expired buckets so the map doesn't grow unbounded.
setInterval(() => {
  const now = Date.now()
  for (const [ip, bucket] of buckets) {
    if (now > bucket.resetAt) buckets.delete(ip)
  }
}, WINDOW_MS).unref()
