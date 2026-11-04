// Shared helpers used by all admin API routes
import { createHmac, timingSafeEqual } from 'crypto'

const COOKIE_NAME = 'ka_admin_token'

export function getAdminConfig() {
  const phone = process.env.ADMIN_PHONE?.trim()
  const password = process.env.ADMIN_PASSWORD
  const secret = process.env.ADMIN_SECRET
  const missing = [
    !phone && 'ADMIN_PHONE',
    !password && 'ADMIN_PASSWORD',
    !secret && 'ADMIN_SECRET',
  ].filter(Boolean)

  return missing.length > 0
    ? { ok: false, missing }
    : { ok: true, phone, password, secret }
}

export function makeAdminToken(config = getAdminConfig()) {
  if (!config.ok) throw new Error('Admin authentication is not configured.')
  return createHmac('sha256', config.secret)
    .update(config.phone + ':' + config.password)
    .digest('hex')
}

function getCookieToken(req) {
  const cookies = req.headers.cookie || ''
  const cookie = cookies.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`))
  if (!cookie) return ''
  try {
    return decodeURIComponent(cookie.slice(COOKIE_NAME.length + 1))
  } catch {
    return ''
  }
}

export function isSecureRequest(req) {
  const forwardedProto = String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim().toLowerCase()
  return forwardedProto === 'https' ||
    (forwardedProto === '' && (req.socket?.encrypted === true || process.env.NODE_ENV === 'production'))
}

export function isCookieAuthenticatedRequest(req) {
  return !req.headers.authorization && Boolean(getCookieToken(req))
}

export function isSameOriginRequest(req) {
  const origin = req.headers.origin
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim()
  const proto = String(req.headers['x-forwarded-proto'] || (req.socket?.encrypted ? 'https' : 'http'))
    .split(',')[0].trim().toLowerCase()
  if (!origin || !host || !['http', 'https'].includes(proto)) return false

  try {
    const parsedOrigin = new URL(origin)
    return parsedOrigin.protocol === `${proto}:` && parsedOrigin.host === host
  } catch {
    return false
  }
}

export function isCsrfProtectedRequest(req) {
  return ['POST', 'PATCH', 'PUT', 'DELETE'].includes(req.method) &&
    isCookieAuthenticatedRequest(req) &&
    !isSameOriginRequest(req)
}

export function isAdminAuthConfigured() {
  return getAdminConfig().ok
}

export function isValidAdminToken(req) {
  const auth = req.headers.authorization || ''
  const bearerToken = auth.replace(/^Bearer\s+/i, '').trim()
  const token = bearerToken || getCookieToken(req)
  const config = getAdminConfig()
  if (!config.ok || !token) return false

  const provided = Buffer.from(token, 'utf8')
  const expected = Buffer.from(makeAdminToken(config), 'utf8')
  return provided.length === expected.length && timingSafeEqual(provided, expected)
}

export function setAdminCookie(res, token, secure) {
  const security = secure ? '; Secure' : ''
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Strict; Max-Age=28800${security}`)
}

export function clearAdminCookie(res, secure) {
  const security = secure ? '; Secure' : ''
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0${security}`)
}
