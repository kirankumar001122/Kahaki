// Shared helpers used by all admin API routes
import { createHmac } from 'crypto'

// ── Admin credentials ──────────────────────────────────────
// Set ADMIN_PHONE / ADMIN_PASSWORD / ADMIN_SECRET as Vercel
// environment variables to override these defaults.
export const ADMIN_PHONE    = process.env.ADMIN_PHONE    || '8884176048'
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Kiran@1234'
export const ADMIN_SECRET   = process.env.ADMIN_SECRET   || 'khaki_admin_v1_secret_2024'

export function makeAdminToken() {
  return createHmac('sha256', ADMIN_SECRET)
    .update(ADMIN_PHONE + ':' + ADMIN_PASSWORD)
    .digest('hex')
}

export function isValidAdminToken(req) {
  const auth  = req.headers['authorization'] || ''
  const token = auth.replace(/^Bearer\s+/i, '').trim()
  return token === makeAdminToken()
}
