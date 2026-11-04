// POST /api/admin/login
// Validates admin credentials and establishes an HttpOnly HMAC session cookie.
// Credentials are never sent back to the client.
import { getAdminConfig, isSameOriginRequest, isSecureRequest, makeAdminToken, setAdminCookie } from '../_adminAuth.js'

export default function handler(req, res) {
  // CORS headers (same-origin in production, relaxed for local dev)
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed.' })
  }

  if (req.headers.origin && !isSameOriginRequest(req)) {
    return res.status(403).json({ ok: false, message: 'Invalid request origin.' })
  }

  const config = getAdminConfig()
  if (!config.ok) {
    console.error('[admin/login] Missing required authentication configuration:', config.missing.join(', '))
    return res.status(503).json({ ok: false, message: 'Admin authentication is not configured.' })
  }

  const body     = req.body || {}
  const phone    = String(body.phone    || '').trim()
  const password = String(body.password || '')

  if (!phone || !password) {
    return res.status(400).json({ ok: false, message: 'Phone and password are required.' })
  }

  if (phone === config.phone && password === config.password) {
    const token = makeAdminToken(config)
    setAdminCookie(res, token, isSecureRequest(req))
    console.log('[admin/login] Login successful')
    return res.status(200).json({ ok: true })
  }

  console.warn('[admin/login] Failed login attempt')
  return res.status(401).json({ ok: false, message: 'Invalid phone number or password.' })
}
