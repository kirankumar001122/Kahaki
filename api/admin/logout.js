import { clearAdminCookie, isCsrfProtectedRequest, isSecureRequest } from '../_adminAuth.js'

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')
  if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Method not allowed.' })
  if (isCsrfProtectedRequest(req)) return res.status(403).json({ ok: false, message: 'Invalid request origin.' })
  clearAdminCookie(res, isSecureRequest(req))
  return res.status(200).json({ ok: true })
}
