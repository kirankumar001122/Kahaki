// GET /api/admin/enquiries
// Returns all admission enquiries from Supabase. Requires valid admin token.
import { createClient } from '@supabase/supabase-js'
import { isValidAdminToken } from '../_adminAuth.js'

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, message: 'Method not allowed.' })
  }

  if (!isValidAdminToken(req)) {
    return res.status(401).json({ ok: false, message: 'Unauthorised.' })
  }

  // Clean the URL in case it has an accidental /rest/v1/ suffix
  const rawUrl = process.env.SUPABASE_URL || ''
  const SUPABASE_URL = rawUrl.replace(/\/(rest\/v1\/?|v1\/?)$/, '').replace(/\/$/, '')
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('[admin/enquiries] Supabase env vars not set')
    return res.status(503).json({ ok: false, message: 'Database not configured.' })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false },
  })

  const { data: rows, error } = await supabase
    .from('admission_enquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[admin/enquiries] Fetch error:', error.message)
    return res.status(500).json({ ok: false, message: 'Failed to fetch enquiries.' })
  }

  return res.status(200).json({ ok: true, enquiries: rows })
}
