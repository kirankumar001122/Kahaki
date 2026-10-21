import { getSupabase, sendError } from './_supabase.js'

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')
  if (req.method !== 'GET') return sendError(res, 405, 'Method not allowed.')

  const supabase = getSupabase()
  if (!supabase) return sendError(res, 503, 'Content service is not configured.')

  const [sections, courses, videos, testimonials] = await Promise.all([
    supabase.from('website_sections').select('*').eq('status', 'published').order('display_order'),
    supabase.from('courses').select('*').eq('status', 'published').order('display_order'),
    supabase.from('website_videos').select('*').eq('status', 'published').order('display_order'),
    supabase.from('testimonials').select('*').eq('status', 'published').order('display_order'),
  ])

  const failure = sections.error || courses.error || videos.error || testimonials.error
  if (failure) {
    console.error('[content] Public content fetch error:', failure.message)
    return sendError(res, 500, 'Failed to load published website content.')
  }

  return res.status(200).json({
    ok: true,
    sections: sections.data || [],
    courses: courses.data || [],
    videos: videos.data || [],
    testimonials: testimonials.data || [],
  })
}
