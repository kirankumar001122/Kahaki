// POST /api/enquiry
// Validates and inserts an admission enquiry into Supabase.
import { createClient } from '@supabase/supabase-js'

// ── Validation ─────────────────────────────────────────────
const trim = (v) => (typeof v === 'string' ? v.trim() : '')

const VALID_MODES  = ['offline', 'live_online', '']
const VALID_LEVELS = ['absolute-beginner', 'beginner', 'intermediate', 'advanced', '']

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

  if (!student_name)               errors.student_name  = 'Student name is required.'
  else if (student_name.length > 120) errors.student_name = 'Name must be 120 characters or fewer.'

  if (!mobile_number)              errors.mobile_number = 'Mobile number is required.'
  else if (!/^\d{10}$/.test(mobile_number)) errors.mobile_number = 'Please enter a valid 10-digit mobile number.'

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.'
  if (email && email.length > 254)  errors.email   = 'Email address is too long.'
  if (message && message.length > 2000) errors.message = 'Message must be 2000 characters or fewer.'
  if (!consent_to_contact)         errors.consent_to_contact = 'Consent to contact is required.'

  if (learning_mode && !VALID_MODES.includes(learning_mode))  errors.learning_mode = 'Invalid learning mode.'
  if (english_level && !VALID_LEVELS.includes(english_level)) errors.english_level  = 'Invalid English level.'

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

// ── Handler ────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed.' })
  }

  // Initialise Supabase
  const rawUrl = process.env.SUPABASE_URL || ''
  const SUPABASE_URL = rawUrl.replace(/\/(rest\/v1\/?|v1\/?)$/, '').replace(/\/$/, '')
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('[enquiry] Supabase env vars not set')
    return res.status(503).json({
      ok: false,
      message: 'Service temporarily unavailable. Please call us at 7338308071.',
    })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false },
  })

  // Validate
  const { errors, data } = validateEnquiry(req.body || {})
  if (errors) {
    return res.status(422).json({ ok: false, errors })
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
      return res.status(429).json({
        ok: false,
        message: 'We already received your enquiry. Our team will contact you shortly.',
      })
    }
  } catch (err) {
    console.error('[enquiry] Duplicate check error:', err.message)
    // Non-fatal — proceed with insert
  }

  // Insert
  const { error: insertError } = await supabase
    .from('admission_enquiries')
    .insert([data])

  if (insertError) {
    console.error('[enquiry] Insert error:', insertError.message)
    return res.status(500).json({
      ok: false,
      message: 'We could not save your enquiry right now. Please call us at 7338308071.',
    })
  }

  return res.status(201).json({
    ok: true,
    message: 'Enquiry received. Our team will contact you shortly.',
  })
}
