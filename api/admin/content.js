import { randomUUID } from 'crypto'
import { isValidAdminToken } from '../_adminAuth.js'
import { getSupabase, sendError } from '../_supabase.js'

const TABLES = {
  sections: 'website_sections',
  courses: 'courses',
  videos: 'website_videos',
  testimonials: 'testimonials',
  media: 'media_assets',
}
const MAX_IMAGE_BYTES = 5 * 1024 * 1024

function text(value, max = 10000) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function status(value) {
  return value === 'published' ? 'published' : 'draft'
}

function parseVideo(url) {
  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'youtu.be' || parsed.hostname.endsWith('youtube.com')) {
      const id = parsed.hostname === 'youtu.be'
        ? parsed.pathname.slice(1)
        : parsed.searchParams.get('v') || parsed.pathname.split('/').pop()
      if (id && /^[\w-]{6,20}$/.test(id)) {
        return { provider: 'youtube', video_url: parsed.toString(), embed_url: `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&controls=1` }
      }
    }
    if (parsed.hostname === 'vimeo.com' || parsed.hostname.endsWith('.vimeo.com')) {
      const id = parsed.pathname.match(/\/(\d+)/)?.[1]
      if (id) return { provider: 'vimeo', video_url: parsed.toString(), embed_url: `https://player.vimeo.com/video/${id}` }
    }
  } catch {
    return null
  }
  return null
}

function cleanPayload(resource, body) {
  if (resource === 'sections') {
    const pageKey = text(body.page_key, 80)
    const sectionKey = text(body.section_key, 80)
    if (!pageKey || !sectionKey) throw new Error('Page and section keys are required.')
    return {
      page_key: pageKey, section_key: sectionKey, title: text(body.title, 240),
      subtitle: text(body.subtitle, 500), body: text(body.body, 12000),
      button_label: text(body.button_label, 120), button_url: text(body.button_url, 500),
      image_url: text(body.image_url, 2000), image_alt: text(body.image_alt, 240),
      seo_title: text(body.seo_title, 240), seo_description: text(body.seo_description, 500),
      status: status(body.status), display_order: Number(body.display_order) || 0,
    }
  }
  if (resource === 'courses') {
    const title = text(body.title, 240)
    if (!title) throw new Error('Course title is required.')
    const slug = text(body.slug, 120).toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '')
    if (!slug) throw new Error('A valid course slug is required.')
    return {
      slug, title, short_description: text(body.short_description, 1000),
      detailed_description: text(body.detailed_description, 12000),
      category: text(body.category, 80) || 'academic', image_url: text(body.image_url, 2000),
      image_alt: text(body.image_alt, 240),
      highlights: Array.isArray(body.highlights) ? body.highlights.map((item) => text(item, 240)).filter(Boolean).slice(0, 12) : [],
      duration: text(body.duration, 120), button_label: text(body.button_label, 120) || 'Enquire Now',
      button_url: text(body.button_url, 500) || '#contact', status: status(body.status),
      display_order: Number(body.display_order) || 0,
    }
  }
  if (resource === 'videos') {
    const title = text(body.title, 240)
    const parsed = parseVideo(text(body.video_url, 1000))
    if (!title || !parsed) throw new Error('A title and valid YouTube or Vimeo URL are required.')
    return { title, description: text(body.description, 4000), ...parsed, thumbnail_url: text(body.thumbnail_url, 2000), status: status(body.status), display_order: Number(body.display_order) || 0 }
  }
  if (resource === 'testimonials') {
    const reviewerName = text(body.reviewer_name, 160)
    const reviewText = text(body.review_text, 3000)
    const rating = Number(body.rating)
    const googleUrl = text(body.google_url, 1000) || 'https://maps.app.goo.gl/3FeizTNvzi8PYoSr9'
    if (!reviewerName || !reviewText) throw new Error('Reviewer name and review text are required.')
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new Error('Rating must be between 1 and 5.')
    try {
      const parsed = new URL(googleUrl)
      if (parsed.protocol !== 'https:' || !parsed.hostname.endsWith('google.com') && !parsed.hostname.endsWith('goo.gl')) throw new Error()
    } catch {
      throw new Error('Google URL must be a valid secure Google Maps link.')
    }
    return {
      reviewer_name: reviewerName, review_text: reviewText, rating,
      course_label: text(body.course_label, 120), google_url: googleUrl,
      status: status(body.status), display_order: Number(body.display_order) || 0,
    }
  }
  throw new Error('Unsupported content type.')
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')
  if (!isValidAdminToken(req)) return sendError(res, 401, 'Unauthorised.')
  const supabase = getSupabase()
  if (!supabase) return sendError(res, 503, 'Content service is not configured.')
  const resource = req.query.resource || 'courses'
  const table = TABLES[resource]
  if (!table) return sendError(res, 400, 'Unsupported content type.')

  if (req.method === 'GET') {
    const query = supabase.from(table).select('*').order('display_order', { ascending: true })
    const { data, error } = await query
    if (error) {
      console.error('[admin/content] Fetch error:', error.message)
      return sendError(res, 500, 'Failed to load content.')
    }
    return res.status(200).json({ ok: true, items: data || [] })
  }

  if (resource === 'media' && req.method === 'POST') {
    const body = req.body || {}
    const match = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(body.data_url || '')
    if (!match) return sendError(res, 422, 'Upload a JPEG, PNG or WebP image.')
    const buffer = Buffer.from(match[2], 'base64')
    if (buffer.length === 0 || buffer.length > MAX_IMAGE_BYTES) return sendError(res, 422, 'Images must be smaller than 5 MB.')
    const extension = match[1].split('/')[1].replace('jpeg', 'jpg')
    const path = `uploads/${randomUUID()}.${extension}`
    const upload = await supabase.storage.from('website-media').upload(path, buffer, { contentType: match[1], upsert: false })
    if (upload.error) {
      console.error('[admin/content] Media upload error:', upload.error.message)
      return sendError(res, 500, 'Failed to upload image.')
    }
    const publicUrl = supabase.storage.from('website-media').getPublicUrl(path).data.publicUrl
    const { data, error } = await supabase.from('media_assets').insert({
      storage_path: path, public_url: publicUrl, file_name: text(body.file_name, 240) || path.split('/').pop(),
      mime_type: match[1], size_bytes: buffer.length, alt_text: text(body.alt_text, 240),
      caption: text(body.caption, 500), display_order: Number(body.display_order) || 0,
    }).select().single()
    if (error) return sendError(res, 500, 'Image uploaded but metadata could not be saved.')
    return res.status(201).json({ ok: true, item: data })
  }

  if (req.method === 'POST' || req.method === 'PATCH') {
    let payload
    try { payload = cleanPayload(resource, req.body || {}) } catch (error) { return sendError(res, 422, error.message) }
    const query = req.method === 'PATCH'
      ? supabase.from(table).update(payload).eq('id', req.body.id).select().single()
      : supabase.from(table).insert(payload).select().single()
    const { data, error } = await query
    if (error) {
      console.error('[admin/content] Save error:', error.message)
      return sendError(res, 500, 'Failed to save content.')
    }
    return res.status(req.method === 'PATCH' ? 200 : 201).json({ ok: true, item: data })
  }

  if (req.method === 'DELETE') {
    const id = text(req.query.id, 100)
    if (!id) return sendError(res, 400, 'Content id is required.')
    if (resource === 'media') {
      const { data: asset, error: readError } = await supabase.from(table).select('storage_path').eq('id', id).single()
      if (readError || !asset) return sendError(res, 404, 'Media item not found.')
      const { error: storageError } = await supabase.storage.from('website-media').remove([asset.storage_path])
      if (storageError) {
        console.error('[admin/content] Media delete error:', storageError.message)
        return sendError(res, 500, 'The image could not be removed from storage.')
      }
    }
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) return sendError(res, 500, 'Failed to delete content.')
    return res.status(200).json({ ok: true })
  }

  return sendError(res, 405, 'Method not allowed.')
}
