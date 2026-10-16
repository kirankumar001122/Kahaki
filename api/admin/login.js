// POST /api/admin/login
// Validates admin credentials and returns an HMAC session token.
// Credentials are never sent back to the client.
import { ADMIN_PHONE, ADMIN_PASSWORD, makeAdminToken } from '../_adminAuth.js'

export default function handler(req, res) {
  // CORS headers (same-origin in production, relaxed for local dev)
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed.' })
  }

  const body     = req.body || {}
  const phone    = String(body.phone    || '').trim()
  const password = String(body.password || '').trim()

  if (!phone || !password) {
    return res.status(400).json({ ok: false, message: 'Phone and password are required.' })
  }

  if (phone === ADMIN_PHONE && password === ADMIN_PASSWORD) {
    const token = makeAdminToken()
    console.log('[admin/login] Login successful')
    return res.status(200).json({ ok: true, token })
  }

  console.warn('[admin/login] Failed login attempt')
  return res.status(401).json({ ok: false, message: 'Invalid phone number or password.' })
}
