import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Check, Edit3, ImagePlus, Plus, Save, Trash2, Upload, Video, X,
} from 'lucide-react';
import './ContentManager.css';

const EMPTY_COURSE = {
  slug: '', title: '', short_description: '', detailed_description: '',
  category: 'academic', image_url: '', image_alt: '', highlights: '',
  duration: '', button_label: 'Enquire Now', button_url: '#contact',
  status: 'draft', display_order: 0,
};
const EMPTY_SECTION = {
  page_key: 'home', section_key: '', title: '', subtitle: '', body: '',
  button_label: '', button_url: '', image_url: '', image_alt: '',
  seo_title: '', seo_description: '', status: 'draft', display_order: 0,
};
const EMPTY_VIDEO = {
  title: '', description: '', video_url: '', thumbnail_url: '',
  status: 'draft', display_order: 0,
};
const EMPTY_TESTIMONIAL = {
  reviewer_name: '', review_text: '', rating: 5, course_label: '',
  google_url: 'https://maps.app.goo.gl/3FeizTNvzi8PYoSr9', status: 'draft', display_order: 0,
};
const EMPTY_FACULTY = {
  full_name: '', photograph: '', designation: '', institution: '',
  qualifications: '', specialisations: '', experience_years: 0,
  professional_profile: '', teaching_methodology: '', additional_achievements: '',
  status: 'draft', display_order: 0,
};

function emptyForm(resource) {
  return resource === 'courses' ? EMPTY_COURSE
    : resource === 'sections' ? EMPTY_SECTION
      : resource === 'videos' ? EMPTY_VIDEO
        : resource === 'testimonials' ? EMPTY_TESTIMONIAL
          : EMPTY_FACULTY;
}

function formTitle(resource, editing) {
  if (editing) return resource === 'faculty' ? 'Edit faculty member' : 'Edit item';
  return resource === 'courses' ? 'New course'
    : resource === 'sections' ? 'New page section'
      : resource === 'videos' ? 'New video'
        : resource === 'testimonials' ? 'New testimonial'
          : 'New faculty member';
}

function ContentManager() {
  const [tab, setTab] = useState('courses');
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY_COURSE);
  const [editing, setEditing] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const editorRef = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/content?resource=${tab}`, {
        credentials: 'same-origin',
      });
      const json = await response.json();
      if (response.status === 401) throw new Error('Your session has expired. Please sign in again.');
      if (!response.ok || !json.ok) throw new Error(json.message || 'Unable to load content.');
      setItems(json.items || []);
    } catch (err) {
      setError(err.message || 'Unable to reach the server.');
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => { load(); }, [load]);

  const startNew = () => {
    setEditing(null);
    setForm(emptyForm(tab));
    setFormOpen(true);
    setMessage('');
    setError('');
  };

  const editItem = (item) => {
    setEditing(item.id);
    setFormOpen(true);
    setForm(tab === 'courses'
      ? { ...item, highlights: (item.highlights || []).join('\n') }
      : tab === 'faculty'
        ? { ...item, qualifications: (item.qualifications || []).join('\n'), specialisations: (item.specialisations || []).join('\n') }
        : { ...item });
    setMessage('');
    setError('');
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
    setForm(emptyForm(tab));
  };

  useEffect(() => {
    if (!formOpen) return;
    editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const firstField = editorRef.current?.querySelector('input, textarea, select');
    firstField?.focus();
  }, [formOpen, tab, editing]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const save = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    const payload = { ...form };
    const submittedStatus = event.nativeEvent.submitter?.value;
    if (tab === 'faculty' && (submittedStatus === 'draft' || submittedStatus === 'published')) payload.status = submittedStatus;
    if (tab === 'courses') payload.highlights = form.highlights.split('\n').map((value) => value.trim()).filter(Boolean);
    if (tab === 'faculty') {
      payload.qualifications = form.qualifications.split('\n').map((value) => value.trim()).filter(Boolean);
      payload.specialisations = form.specialisations.split('\n').map((value) => value.trim()).filter(Boolean);
    }
    if (editing) payload.id = editing;
    try {
      const response = await fetch(`/api/admin/content?resource=${tab}`, {
        method: editing ? 'PATCH' : 'POST',
        credentials: 'same-origin', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await response.json();
      if (!response.ok || !json.ok) throw new Error(json.message || 'Unable to save content.');
      startNew();
      await load();
      setMessage(`${tab === 'courses' ? 'Course' : tab === 'sections' ? 'Section' : tab === 'videos' ? 'Video' : tab === 'testimonials' ? 'Testimonial' : 'Faculty profile'} saved.`);
    } catch (err) {
      setError(err.message || 'Unable to save content.');
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this item permanently?')) return;
    setError('');
    try {
      const response = await fetch(`/api/admin/content?resource=${tab}&id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        credentials: 'same-origin',
      });
      const json = await response.json();
      if (!response.ok || !json.ok) throw new Error(json.message || 'Unable to delete item.');
      await load();
    } catch (err) {
      setError(err.message || 'Unable to delete item.');
    }
  };

  const renderField = (name, label, options = {}) => (
    <label className="content-field" key={name}>
      <span>{label}{options.required ? ' *' : ''}</span>
      {options.textarea ? (
        <textarea name={name} value={form[name] || ''} onChange={updateField} rows={options.rows || 4} required={options.required} />
      ) : (
        <input name={name} type={options.type || 'text'} value={form[name] ?? ''} onChange={updateField} required={options.required} />
      )}
    </label>
  );

  return (
    <section className="content-manager">
      <div className="content-manager__heading">
        <div>
          <p className="content-manager__eyebrow">Website Content</p>
          <h2>Content Manager</h2>
          <p>Save drafts, publish updates, and manage the content shown on the public website.</p>
        </div>
        <button type="button" className="content-btn content-btn--primary" onClick={startNew}><Plus size={16} /> New item</button>
      </div>

      <nav className="content-tabs" aria-label="Content types">
        {[
          ['courses', 'Courses'],
          ['sections', 'Page sections'],
          ['videos', 'Videos'],
          ['testimonials', 'Testimonials'],
          ['faculty', 'Teaching staff'],
        ].map(([value, label]) => (
          <button type="button" key={value} className={tab === value ? 'is-active' : ''} onClick={() => { setTab(value); setForm(emptyForm(value)); setEditing(null); setFormOpen(false); }}>
            {value === 'videos' ? <Video size={15} /> : <Edit3 size={15} />}{label}
          </button>
        ))}
      </nav>

      {message && <div className="content-alert content-alert--success"><Check size={16} />{message}</div>}
      {error && <div className="content-alert content-alert--error">{error}</div>}

      <div className="content-manager__layout">
        {formOpen ? <form ref={editorRef} className="content-editor content-editor--open" onSubmit={save}>
          <div className="content-editor__title">
            <h3>{formTitle(tab, editing)}</h3>
            <button type="button" className="content-icon-btn" onClick={closeForm} aria-label="Cancel form"><X size={16} /></button>
          </div>
          {tab === 'courses' && (
            <>
              <div className="content-form-grid">{renderField('title', 'Course title', { required: true })}{renderField('slug', 'Slug', { required: true })}{renderField('category', 'Category')}{renderField('duration', 'Duration')}</div>
              {renderField('short_description', 'Short description', { required: true, textarea: true, rows: 3 })}
              {renderField('detailed_description', 'Detailed description', { textarea: true, rows: 5 })}
              {renderField('highlights', 'Highlights (one per line)', { textarea: true, rows: 4 })}
              <div className="content-form-grid">{renderField('image_url', 'Image URL')}{renderField('image_alt', 'Image alt text')}{renderField('button_label', 'Button label')}{renderField('button_url', 'Button URL')}</div>
            </>
          )}
          {tab === 'sections' && (
            <>
              <div className="content-form-grid">{renderField('page_key', 'Page key', { required: true })}{renderField('section_key', 'Section key', { required: true })}</div>
              {renderField('title', 'Section title')}{renderField('subtitle', 'Subtitle')}{renderField('body', 'Description', { textarea: true, rows: 7 })}
              <div className="content-form-grid">{renderField('button_label', 'Button label')}{renderField('button_url', 'Button URL')}{renderField('image_url', 'Image URL')}{renderField('image_alt', 'Image alt text')}</div>
              <div className="content-form-grid">{renderField('seo_title', 'SEO title')}{renderField('seo_description', 'SEO description', { textarea: true, rows: 3 })}</div>
            </>
          )}
          {tab === 'videos' && (
            <>
              {renderField('title', 'Video title', { required: true })}{renderField('video_url', 'YouTube or Vimeo URL', { required: true })}{renderField('description', 'Description', { textarea: true, rows: 4 })}{renderField('thumbnail_url', 'Thumbnail URL')}
            </>
          )}
          {tab === 'testimonials' && (
            <>
              <div className="content-form-grid">{renderField('reviewer_name', 'Reviewer name', { required: true })}{renderField('course_label', 'Course label')}</div>
              {renderField('review_text', 'Review text', { required: true, textarea: true, rows: 6 })}
              <div className="content-form-grid">{renderField('rating', 'Star rating', { type: 'number' })}{renderField('google_url', 'Google listing URL')}</div>
            </>
          )}
          {tab === 'faculty' && (
            <>
              <div className="content-form-grid">{renderField('full_name', 'Full name', { required: true })}{renderField('designation', 'Designation', { required: true })}{renderField('institution', 'Institution')}{renderField('photograph', 'Photograph URL')}</div>
              {renderField('qualifications', 'Qualifications (one per line)', { textarea: true, rows: 4 })}
              {renderField('specialisations', 'Subject specialisations (one per line)', { textarea: true, rows: 4 })}
              <div className="content-form-grid">{renderField('experience_years', 'Years of teaching experience', { type: 'number' })}{renderField('additional_achievements', 'Additional achievements', { textarea: true, rows: 3 })}</div>
              {renderField('professional_profile', 'Professional profile', { textarea: true, rows: 6 })}
              {renderField('teaching_methodology', 'Teaching methodology', { textarea: true, rows: 6 })}
            </>
          )}
          <div className="content-form-grid content-form-grid--small">
            <label className="content-field"><span>Status</span><select name="status" value={form.status} onChange={updateField}><option value="draft">Draft</option><option value="published">Published</option></select></label>
            {renderField('display_order', 'Display order', { type: 'number' })}
          </div>
          {tab === 'faculty' ? (
            <div className="content-form-actions">
              <button className="content-btn content-btn--secondary" type="submit" name="save-draft" value="draft" disabled={loading}><Save size={16} />{editing ? 'Update Draft' : 'Save Draft'}</button>
              <button className="content-btn content-btn--primary" type="submit" name="publish" value="published" disabled={loading}><Save size={16} />{editing ? 'Update & Publish' : 'Publish'}</button>
            </div>
          ) : (
            <button className="content-btn content-btn--primary" type="submit" disabled={loading}><Save size={16} />{loading ? 'Saving…' : 'Save content'}</button>
          )}
        </form> : (
          <div className="content-editor content-editor--closed">
            <p className="content-state">Choose “New item” to create {tab === 'faculty' ? 'a faculty member' : `a ${tab === 'sections' ? 'page section' : tab.slice(0, -1)}`}.</p>
          </div>
        )}

        <div className="content-list">
          <div className="content-list__header">          <h3>{tab === 'courses' ? 'Courses' : tab === 'sections' ? 'Sections' : tab === 'videos' ? 'Videos' : tab === 'testimonials' ? 'Testimonials' : 'Teaching staff'}</h3><button type="button" className="content-icon-btn" onClick={load} aria-label="Refresh"><Upload size={16} /></button></div>
          {loading && <p className="content-state">Loading…</p>}
          {!loading && items.length === 0 && <p className="content-state">No items yet. Create your first draft.</p>}
          {!loading && items.map((item) => (
            <article className="content-list__item" key={item.id}>
              <div><strong>{item.title || item.full_name || `${item.page_key} / ${item.section_key}`}</strong><span>{item.status} · order {item.display_order}</span></div>
              <div className="content-list__actions"><button type="button" className="content-icon-btn" onClick={() => editItem(item)} aria-label="Edit"><Edit3 size={15} /></button><button type="button" className="content-icon-btn content-icon-btn--danger" onClick={() => remove(item.id)} aria-label="Delete"><Trash2 size={15} /></button></div>
            </article>
          ))}
        </div>
      </div>
      <MediaUploader
        onUse={(url) => setForm((previous) => ({
          ...previous,
          [tab === 'faculty' ? 'photograph' : 'image_url']: url,
        }))}
      />
    </section>
  );
}

function MediaUploader({ onUse }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [altText, setAltText] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [library, setLibrary] = useState([]);

  const loadLibrary = useCallback(async () => {
    const response = await fetch('/api/admin/content?resource=media', {
      credentials: 'same-origin',
    });
    const json = await response.json();
    if (response.ok && json.ok) setLibrary(json.items || []);
  }, []);

  useEffect(() => { loadLibrary(); }, [loadLibrary]);

  const choose = (event) => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(selected.type) || selected.size > 5 * 1024 * 1024) {
      setError('Choose a JPEG, PNG or WebP image smaller than 5 MB.');
      return;
    }
    setFile(selected);
    setError('');
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result));
    reader.readAsDataURL(selected);
  };

  const upload = () => {
    if (!file || !preview) return;
    setMessage('');
    fetch('/api/admin/content?resource=media', {
      method: 'POST',
      credentials: 'same-origin', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data_url: preview, file_name: file.name, alt_text: altText }),
    }).then(async (response) => {
      const json = await response.json();
      if (!response.ok || !json.ok) throw new Error(json.message || 'Upload failed.');
      setMessage('Image uploaded. Copy its URL into a course or section.');
      setFile(null); setPreview(''); setAltText('');
      await loadLibrary();
    }).catch((err) => setError(err.message || 'Upload failed.'));
  };

  return (
    <div className="media-uploader">
      <div><p className="content-manager__eyebrow">Media library</p><h3><ImagePlus size={18} /> Upload an image</h3><p>Images are stored in Supabase Storage and can be reused by URL.</p></div>
      <input type="file" accept="image/jpeg,image/png,image/webp" onChange={choose} />
      {preview && <img src={preview} alt="Selected preview" className="media-uploader__preview" />}
      {file && <input placeholder="Image alt text" value={altText} onChange={(event) => setAltText(event.target.value)} />}
      <button type="button" className="content-btn content-btn--secondary" onClick={upload} disabled={!file}><Upload size={15} /> Upload image</button>
      {message && <small className="content-success">{message}</small>}{error && <small className="content-error">{error}</small>}
      {library.length > 0 && (
        <div className="media-library">
          {library.map((asset) => (
            <div className="media-library__item" key={asset.id}>
              <img src={asset.public_url} alt={asset.alt_text || asset.file_name} />
              <button type="button" className="content-btn content-btn--secondary" onClick={() => onUse(asset.public_url)}>Use image</button>
              <button type="button" className="content-icon-btn content-icon-btn--danger" onClick={async () => {
                if (!window.confirm('Delete this image permanently?')) return;
                await fetch(`/api/admin/content?resource=media&id=${asset.id}`, {
                  method: 'DELETE',
                  credentials: 'same-origin',
                });
                await loadLibrary();
              }} aria-label={`Delete ${asset.file_name}`}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContentManager;
