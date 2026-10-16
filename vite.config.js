import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { createClient } from '@supabase/supabase-js'
import { createHmac }   from 'crypto'

// ── Admin credentials (server-side only — never sent to client) ─
const ADMIN_PHONE    = '8884176048'
const ADMIN_PASSWORD = 'Kiran@1234'
const ADMIN_SECRET   = 'khaki_admin_v1_secret_2024'   // internal signing key

function makeAdminToken() {
  return createHmac('sha256', ADMIN_SECRET)
    .update(ADMIN_PHONE + ':' + ADMIN_PASSWORD)
    .digest('hex')
}

function isValidAdminToken(req) {
  const auth = req.headers['authorization'] || ''
  const token = auth.replace(/^Bearer\s+/i, '').trim()
  return token === makeAdminToken()
}

// ── Validation helpers ─────────────────────────────────────
const trim = (v) => (typeof v === 'string' ? v.trim() : '')

function validateEnquiry(body) {
  const errors = {}

  const student_name       = trim(body.student_name)
  const mobile_number      = trim(body.mobile_number).replace(/\s/g, '')
  const email              = trim(body.email)
  const course             = trim(body.course)
  const learning_mode      = trim(body.learning_mode)
  const english_level      = trim(body.english_level)
  const message            = trim(body.message)
  const consent_to_contact = body.consent_to_contact === true

  if (!student_name)                errors.student_name = 'Student name is required.'
  else if (student_name.length > 120) errors.student_name = 'Name must be 120 characters or fewer.'

  if (!mobile_number)               errors.mobile_number = 'Mobile number is required.'
  else if (!/^\d{10}$/.test(mobile_number)) errors.mobile_number = 'Please enter a valid 10-digit mobile number.'

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.'
  if (email && email.length > 254)  errors.email = 'Email address is too long.'
  if (message && message.length > 2000) errors.message = 'Message must be 2000 characters or fewer.'
  if (!consent_to_contact)          errors.consent_to_contact = 'Consent to contact is required.'

  const VALID_MODES   = ['offline', 'live_online', '']
  const VALID_LEVELS  = ['absolute-beginner', 'beginner', 'intermediate', 'advanced', '']
  if (learning_mode && !VALID_MODES.includes(learning_mode))   errors.learning_mode = 'Invalid learning mode.'
  if (english_level && !VALID_LEVELS.includes(english_level))  errors.english_level = 'Invalid English level.'

  if (Object.keys(errors).length > 0) return { errors, data: null }

  return {
    errors: null,
    data: {
      student_name,
      mobile_number,
      email:              email         || null,
      course:             course        || null,
      learning_mode:      learning_mode || null,
      english_level:      english_level || null,
      message:            message       || null,
      consent_to_contact,
      status: 'new',
    },
  }
}

// ── Vite API middleware plugin ─────────────────────────────
// Runs inside the Vite dev server — no separate process needed.
// Env vars from .env.local are loaded by Vite automatically.
function apiPlugin(env) {
  // Initialise Supabase once per server start (not per request)
  let supabase = null

  const SUPABASE_URL              = env.SUPABASE_URL
  const SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.warn(
      '\n[api] ⚠  SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are not set in .env.local.' +
      '\n[api]    Form submissions will not be saved until these are configured.\n'
    )
  } else {
    // Strip any accidental path suffix from the URL (e.g. /rest/v1/)
    const cleanUrl = SUPABASE_URL.replace(/\/(rest\/v1\/?|v1\/?)$/, '').replace(/\/$/, '')
    supabase = createClient(cleanUrl, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    })
    console.log('[api] ✓ Supabase client initialised for', cleanUrl)
  }

  return {
    name: 'vite-api-middleware',
    configureServer(server) {
      server.middlewares.use('/api/health', (_req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ ok: true, service: 'khaki-academy-api' }))
      })

      server.middlewares.use('/api/enquiry', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')

        // Only accept POST
        if (req.method !== 'POST') {
          res.statusCode = 405
          return res.end(JSON.stringify({ ok: false, message: 'Method not allowed.' }))
        }

        // Supabase not configured
        if (!supabase) {
          console.error('[api] Supabase not configured — check .env.local')
          res.statusCode = 503
          return res.end(JSON.stringify({
            ok: false,
            message: 'Service temporarily unavailable. Please call us at 7338308071.',
          }))
        }

        // Parse JSON body
        let body = {}
        try {
          body = await new Promise((resolve, reject) => {
            let raw = ''
            req.on('data', (chunk) => { raw += chunk })
            req.on('end',  () => {
              try { resolve(JSON.parse(raw)) } catch { reject(new Error('Invalid JSON')) }
            })
            req.on('error', reject)
          })
        } catch {
          res.statusCode = 400
          return res.end(JSON.stringify({ ok: false, message: 'Invalid request body.' }))
        }

        // Validate
        const { errors, data } = validateEnquiry(body)
        if (errors) {
          res.statusCode = 422
          return res.end(JSON.stringify({ ok: false, errors }))
        }

        // Duplicate-submission guard (same mobile within 5 minutes)
        try {
          const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
          const { data: existing } = await supabase
            .from('admission_enquiries')
            .select('id')
            .eq('mobile_number', data.mobile_number)
            .gte('created_at', fiveMinutesAgo)
            .limit(1)

          if (existing && existing.length > 0) {
            res.statusCode = 429
            return res.end(JSON.stringify({
              ok: false,
              message: 'We already received your enquiry. Our team will contact you shortly.',
            }))
          }
        } catch (err) {
          console.error('[api] Duplicate check error:', err.message)
          // Non-fatal — proceed with insert
        }

        // Insert into Supabase
        const { error: insertError } = await supabase
          .from('admission_enquiries')
          .insert([data])

        if (insertError) {
          console.error('[api] Supabase insert error:', insertError.message)
          res.statusCode = 500
          return res.end(JSON.stringify({
            ok: false,
            message: 'We could not save your enquiry right now. Please call us at 7338308071.',
          }))
        }

        res.statusCode = 201
        return res.end(JSON.stringify({
          ok: true,
          message: 'Enquiry received. Our team will contact you shortly.',
        }))
      })

      // ── Admin: login ───────────────────────────────────────
      server.middlewares.use('/api/admin/login', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        if (req.method !== 'POST') {
          res.statusCode = 405
          return res.end(JSON.stringify({ ok: false, message: 'Method not allowed.' }))
        }
        let body = {}
        try {
          body = await new Promise((resolve, reject) => {
            let raw = ''
            req.on('data', (chunk) => { raw += chunk })
            req.on('end',  () => { try { resolve(JSON.parse(raw)) } catch { reject(new Error('Invalid JSON')) } })
            req.on('error', reject)
          })
        } catch {
          res.statusCode = 400
          return res.end(JSON.stringify({ ok: false, message: 'Invalid request.' }))
        }

        const phone    = (body.phone    || '').trim()
        const password = (body.password || '').trim()

        if (phone === ADMIN_PHONE && password === ADMIN_PASSWORD) {
          const token = makeAdminToken()
          console.log('[api] Admin login successful for', phone)
          res.statusCode = 200
          return res.end(JSON.stringify({ ok: true, token }))
        }

        console.warn('[api] Admin login failed — wrong credentials')
        res.statusCode = 401
        return res.end(JSON.stringify({ ok: false, message: 'Invalid phone number or password.' }))
      })

      // ── Admin: list enquiries ──────────────────────────────
      server.middlewares.use('/api/admin/enquiries', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        if (req.method !== 'GET') {
          res.statusCode = 405
          return res.end(JSON.stringify({ ok: false, message: 'Method not allowed.' }))
        }
        if (!isValidAdminToken(req)) {
          res.statusCode = 401
          return res.end(JSON.stringify({ ok: false, message: 'Unauthorised.' }))
        }
        if (!supabase) {
          res.statusCode = 503
          return res.end(JSON.stringify({ ok: false, message: 'Database not configured.' }))
        }

        const { data: rows, error } = await supabase
          .from('admission_enquiries')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('[api] Admin enquiries fetch error:', error.message)
          res.statusCode = 500
          return res.end(JSON.stringify({ ok: false, message: 'Failed to fetch enquiries.' }))
        }

        res.statusCode = 200
        return res.end(JSON.stringify({ ok: true, enquiries: rows }))
      })
    },
  }
}

// ── Vite config ────────────────────────────────────────────
export default defineConfig(({ mode }) => {
  // Load .env.local (and .env) — Vite does this automatically for
  // VITE_ prefixed vars, but we load all vars here for the server plugin.
  const env = loadEnv(mode, process.cwd(), '') // '' = load all prefixes

  return {
    plugins: [
      react(),
      apiPlugin(env),   // Handles /api/* inside the Vite dev server
    ],
  }
})
