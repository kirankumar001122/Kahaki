import { createClient } from '@supabase/supabase-js'

export function getSupabase() {
  const rawUrl = process.env.SUPABASE_URL || ''
  const url = rawUrl.replace(/\/(rest\/v1\/?|v1\/?)$/, '').replace(/\/$/, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}

export function sendError(res, status, message) {
  return res.status(status).json({ ok: false, message })
}
