/**
 * Khaki Academy — Secure API Server
 * -------------------------------------------------
 * Runs alongside Vite in development (port 3001).
 * In production, serve the built Vite dist/ from here too.
 *
 * The Supabase SERVICE ROLE KEY lives only in this process.
 * It is never sent to the browser or included in the client bundle.
 */

import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app  = express();
const PORT = process.env.API_PORT || 3001;

// ── Environment validation ─────────────────────────────────
const SUPABASE_URL            = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    '[server] FATAL: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local'
  );
  process.exit(1);
}

// ── Supabase admin client (service-role — server only) ────
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// ── Middleware ─────────────────────────────────────────────
app.use(express.json({ limit: '16kb' }));

// In dev, allow requests from the Vite dev server.
// In production, serve the React app from the same origin — no CORS needed.
const DEV_ORIGIN = 'http://localhost:5173';
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : DEV_ORIGIN,
  methods: ['POST'],
}));

// ── Helpers ────────────────────────────────────────────────

/** Trim a string or return '' */
const str = (v) => (typeof v === 'string' ? v.trim() : '');

/** Validate the enquiry payload; returns { errors, data } */
function validateEnquiry(body) {
  const errors = {};

  const student_name       = str(body.student_name);
  const mobile_number      = str(body.mobile_number);
  const email              = str(body.email);
  const course             = str(body.course);
  const learning_mode      = str(body.learning_mode);
  const english_level      = str(body.english_level);
  const message            = str(body.message);
  const consent_to_contact = body.consent_to_contact === true;

  if (!student_name)
    errors.student_name = 'Student name is required.';
  else if (student_name.length > 120)
    errors.student_name = 'Name must be 120 characters or fewer.';

  if (!mobile_number)
    errors.mobile_number = 'Mobile number is required.';
  else if (!/^\d{10}$/.test(mobile_number.replace(/\s/g, '')))
    errors.mobile_number = 'Please enter a valid 10-digit mobile number.';

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'Please enter a valid email address.';

  if (email && email.length > 254)
    errors.email = 'Email address is too long.';

  if (message && message.length > 2000)
    errors.message = 'Message must be 2000 characters or fewer.';

  if (!consent_to_contact)
    errors.consent_to_contact = 'Consent to contact is required.';

  // learning_mode is required (has a dedicated field in the form)
  const VALID_MODES = ['offline', 'online', 'either', ''];
  if (learning_mode && !VALID_MODES.includes(learning_mode))
    errors.learning_mode = 'Invalid learning mode.';

  // english_level only required when course is spoken-english
  const VALID_LEVELS = ['absolute-beginner', 'beginner', 'intermediate', 'advanced', ''];
  if (english_level && !VALID_LEVELS.includes(english_level))
    errors.english_level = 'Invalid English level.';

  if (Object.keys(errors).length > 0) {
    return { errors, data: null };
  }

  return {
    errors: null,
    data: {
      student_name,
      mobile_number: mobile_number.replace(/\s/g, ''),
      email:              email   || null,
      course:             course  || null,
      learning_mode:      learning_mode || null,
      english_level:      english_level || null,
      message:            message || null,
      consent_to_contact,
      status:             'new',  // initial status
    },
  };
}

// ── POST /api/enquiry ──────────────────────────────────────
app.post('/api/enquiry', async (req, res) => {
  try {
    const { errors, data } = validateEnquiry(req.body);

    if (errors) {
      return res.status(422).json({ ok: false, errors });
    }

    // Duplicate-submission guard: check for a recent submission
    // with the same mobile number (within the last 5 minutes).
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: existing } = await supabase
      .from('admission_enquiries')
      .select('id, created_at')
      .eq('mobile_number', data.mobile_number)
      .gte('created_at', fiveMinutesAgo)
      .limit(1);

    if (existing && existing.length > 0) {
      return res.status(429).json({
        ok: false,
        message: 'We already received your enquiry. Our team will contact you shortly.',
      });
    }

    // Insert into Supabase
    const { error: insertError } = await supabase
      .from('admission_enquiries')
      .insert([data]);

    if (insertError) {
      console.error('[server] Supabase insert error:', insertError.message);
      return res.status(500).json({
        ok: false,
        message: 'We could not save your enquiry right now. Please call us directly at 7338308071.',
      });
    }

    return res.status(201).json({
      ok: true,
      message: 'Enquiry received. Our team will contact you shortly.',
    });

  } catch (err) {
    console.error('[server] Unexpected error:', err);
    return res.status(500).json({
      ok: false,
      message: 'Something went wrong. Please call us at 7338308071.',
    });
  }
});

// ── Health check ───────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'khaki-academy-api' });
});

// ── Start ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[server] API listening on http://localhost:${PORT}`);
});
