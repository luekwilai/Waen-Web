type RateLimitEntry = {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

function now() {
  return Date.now()
}

function normalizeKey(key: string) {
  return key.trim().toLowerCase() || "anonymous"
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown"
  }

  const realIp = request.headers.get("x-real-ip")
  if (realIp) {
    return realIp.trim()
  }

  return "unknown"
}

export function checkRateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string
  limit: number
  windowMs: number
}) {
  const normalizedKey = normalizeKey(key)
  const timestamp = now()
  const current = store.get(normalizedKey)

  if (!current || current.resetAt <= timestamp) {
    const next = {
      count: 1,
      resetAt: timestamp + windowMs,
    }
    store.set(normalizedKey, next)

    return {
      allowed: true,
      remaining: Math.max(limit - next.count, 0),
      resetAt: next.resetAt,
    }
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: current.resetAt,
    }
  }

  current.count += 1
  store.set(normalizedKey, current)

  return {
    allowed: true,
    remaining: Math.max(limit - current.count, 0),
    resetAt: current.resetAt,
  }
}

export function resetRateLimit(key: string) {
  store.delete(normalizeKey(key))
}
