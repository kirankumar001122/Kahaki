import { useState } from 'react';
import { Send, Phone, Mail, MapPin, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

// ── Contact Configuration ──────────────────────────────────
const PHONE_1   = '7338308071';
const PHONE_2   = '7338308072';
const EMAIL     = 'khakiacademy03@gmail.com';
const WA_NUMBER = '917338308071'; // Confirm if this number supports WhatsApp

const EMPTY_FORM = {
  name: '', parentName: '', phone: '', email: '',
  currentClass: '', stream: '', course: '', learningMode: '',
  englishLevel: '', consent: false, message: '',
};

export default function Contact() {
  const [form, setForm]         = useState(EMPTY_FORM);
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (serverError) setServerError('');
  };

  // Client-side validation mirrors server validation
  const validate = () => {
    const errs = {};
    if (!form.name.trim())
      errs.name = 'Student name is required.';
    if (!form.phone.trim())
      errs.phone = 'Mobile number is required.';
    else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, '')))
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Please enter a valid email address.';
    if (!form.consent)
      errs.consent = 'Please provide your consent to be contacted.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    if (loading || submitted) return;

    setLoading(true);
    setErrors({});
    setServerError('');

    // Map form state to the server's expected field names
    const payload = {
      student_name:       form.name.trim(),
      mobile_number:      form.phone.trim().replace(/\s/g, ''),
      email:              form.email.trim() || null,
      course:             form.course       || null,
      learning_mode:      form.learningMode || null,
      english_level:      form.englishLevel || null,
      message:            form.message.trim() || null,
      consent_to_contact: form.consent,
    };

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok && json.ok) {
        setSubmitted(true);
      } else if (res.status === 422 && json.errors) {
        // Map server field names back to form field names for display
        const fieldMap = {
          student_name:       'name',
          mobile_number:      'phone',
          email:              'email',
          consent_to_contact: 'consent',
          learning_mode:      'learningMode',
          english_level:      'englishLevel',
        };
        const remapped = {};
        Object.entries(json.errors).forEach(([k, v]) => {
          remapped[fieldMap[k] || k] = v;
        });
        setErrors(remapped);
      } else {
        // 429 duplicate or 500 server error — show the safe message from the server
        setServerError(
          json.message ||
          'Something went wrong. Please call us directly at 7338308071.'
        );
      }
    } catch {
      setServerError(
        'Unable to reach the server. Please check your connection or call us at 7338308071.'
      );
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent('Hi Khaki Academy! I would like to enquire about admissions and courses.');
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
  };

  const isSpokenEnglish = form.course === 'spoken-english';

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="text-center fade-in">
          <p className="section-label">Contact Admissions</p>
          <h2 className="section-title">Enquire About Admissions</h2>
          <p className="section-subtitle">
            Fill in the form below or reach us directly by phone or WhatsApp.
            Our team will get back to you to discuss your course options.
          </p>
        </div>

        <div className="contact__grid">
          {/* Info panel */}
          <div className="contact__info fade-in-left">
            <div className="contact__info-card">
              <h3 className="contact__info-heading">Contact Khaki Academy</h3>
              <p className="contact__info-sub">
                Reach us for admissions, course details, batch timings, or any other
                enquiries. We are happy to help.
              </p>

              <div className="contact__info-items">
                <div className="contact__info-item">
                  <span className="contact__info-icon"><Phone size={18} /></span>
                  <div>
                    <p className="contact__info-label">Call Us</p>
                    <a href={`tel:${PHONE_1}`} className="contact__info-value">{PHONE_1}</a>
                    <a href={`tel:${PHONE_2}`} className="contact__info-value">{PHONE_2}</a>
                  </div>
                </div>

                <div className="contact__info-item">
                  <span className="contact__info-icon"><Mail size={18} /></span>
                  <div>
                    <p className="contact__info-label">Email Us</p>
                    <a href={`mailto:${EMAIL}`} className="contact__info-value">{EMAIL}</a>
                  </div>
                </div>

                <div className="contact__info-item">
                  <span className="contact__info-icon"><MapPin size={18} /></span>
                  <div>
                    <p className="contact__info-label">Our Address</p>
                    <p className="contact__info-value contact__info-address">
                      Opp. Anjaneyaswamy Temple,<br />
                      Above Sowparnika Bakery,<br />
                      Malur to Hosur Road,<br />
                      Near Railway Station,<br />
                      Malur – 563130, Karnataka
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <button className="contact__whatsapp-btn" onClick={openWhatsApp}>
                <MessageCircle size={20} />
                Chat with Us on WhatsApp
              </button>

              {/* Batch Timings */}
              <div className="contact__timings">
                <p className="contact__timings-title">Batch Timings</p>
                <div className="contact__timings-rows">
                  <div className="contact__timing-row">
                    <span>🌅 Morning Batch</span>
                    <span>6:00 AM – 8:00 AM</span>
                  </div>
                  <div className="contact__timing-row">
                    <span>🌆 Evening Batch</span>
                    <span>5:00 PM – 9:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact__form-wrap fade-in-right">
            {submitted ? (
              <div className="contact__success">
                <div className="contact__success-icon"><CheckCircle size={48} /></div>
                <h3>Thank You, {form.name || 'there'}!</h3>
                <p>
                  Your enquiry has been saved. The Khaki Academy team will contact you
                  shortly. You can also reach us directly at{' '}
                  <a href={`tel:${PHONE_1}`} style={{ color: 'var(--gold-dark)', fontWeight: 600 }}>
                    {PHONE_1}
                  </a>.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSubmitted(false);
                    setForm(EMPTY_FORM);
                    setServerError('');
                  }}
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <h3 className="contact__form-title">Submit an Enquiry</h3>

                {/* Server-level error banner */}
                {serverError && (
                  <div className="contact__server-error">
                    <AlertCircle size={17} />
                    <span>{serverError}</span>
                  </div>
                )}

                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="name">Student Name *</label>
                    <input
                      id="name" name="name" type="text" required
                      placeholder="e.g. Rahul Kumar"
                      value={form.name} onChange={handleChange}
                      className={errors.name ? 'input-error' : ''}
                    />
                    {errors.name && <span className="contact__field-error">{errors.name}</span>}
                  </div>
                  <div className="contact__field">
                    <label htmlFor="parentName">Parent / Guardian Name</label>
                    <input
                      id="parentName" name="parentName" type="text"
                      placeholder="Optional"
                      value={form.parentName} onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="phone">Mobile Number *</label>
                    <input
                      id="phone" name="phone" type="tel" required
                      placeholder="e.g. 9876543210"
                      value={form.phone} onChange={handleChange}
                      className={errors.phone ? 'input-error' : ''}
                    />
                    {errors.phone && <span className="contact__field-error">{errors.phone}</span>}
                  </div>
                  <div className="contact__field">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email" name="email" type="email"
                      placeholder="Optional"
                      value={form.email} onChange={handleChange}
                      className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && <span className="contact__field-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="currentClass">Current Class</label>
                    <select id="currentClass" name="currentClass" value={form.currentClass} onChange={handleChange}>
                      <option value="">— Select Class —</option>
                      <option value="class-1-5">Class 1–5</option>
                      <option value="class-6-10">Class 6–10</option>
                      <option value="1st-puc">1st PUC</option>
                      <option value="2nd-puc">2nd PUC</option>
                      <option value="working-professional">Working Professional</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="contact__field">
                    <label htmlFor="stream">Stream</label>
                    <select id="stream" name="stream" value={form.stream} onChange={handleChange}>
                      <option value="">— Select Stream —</option>
                      <option value="science">Science</option>
                      <option value="commerce">Commerce</option>
                      <option value="other">Other / Not Applicable</option>
                    </select>
                  </div>
                </div>

                <div className="contact__field">
                  <label htmlFor="course">Interested Programme</label>
                  <select id="course" name="course" value={form.course} onChange={handleChange}>
                    <option value="">— Select Programme —</option>
                    <option value="school-tuition">School Tuition (Classes 1–10)</option>
                    <option value="1st-puc-science">1st PUC Science</option>
                    <option value="2nd-puc-science">2nd PUC Science</option>
                    <option value="1st-puc-commerce">1st PUC Commerce</option>
                    <option value="2nd-puc-commerce">2nd PUC Commerce</option>
                    <option value="cet">CET Foundation</option>
                    <option value="neet">NEET Foundation</option>
                    <option value="jee">JEE Foundation</option>
                    <option value="spoken-english">Spoken English</option>
                    <option value="computer-training">Computer Training</option>
                    <option value="career-skills">Career &amp; Professional Skills</option>
                    <option value="other">Other / Not Sure</option>
                  </select>
                </div>

                {/* Conditional: English level shown only for Spoken English */}
                {isSpokenEnglish && (
                  <div className="contact__field">
                    <label htmlFor="englishLevel">Current English Level</label>
                    <select
                      id="englishLevel" name="englishLevel"
                      value={form.englishLevel} onChange={handleChange}
                      className={errors.englishLevel ? 'input-error' : ''}
                    >
                      <option value="">— Select Your Level —</option>
                      <option value="absolute-beginner">Absolute Beginner</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                    {errors.englishLevel && <span className="contact__field-error">{errors.englishLevel}</span>}
                  </div>
                )}

                <div className="contact__field">
                  <label htmlFor="learningMode">Preferred Learning Mode</label>
                  <select
                    id="learningMode" name="learningMode"
                    value={form.learningMode} onChange={handleChange}
                    className={errors.learningMode ? 'input-error' : ''}
                  >
                    <option value="">— Select Mode —</option>
                    <option value="offline">Offline – Malur Campus</option>
                    <option value="live_online">Live Online</option>
                  </select>
                  {errors.learningMode && <span className="contact__field-error">{errors.learningMode}</span>}
                </div>

                <div className="contact__field">
                  <label htmlFor="message">Message (optional)</label>
                  <textarea
                    id="message" name="message" rows={3}
                    placeholder="Any questions or additional information..."
                    value={form.message} onChange={handleChange}
                  />
                </div>

                {/* Consent checkbox */}
                <div className="contact__field contact__field--checkbox">
                  <label className="contact__consent-label">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={form.consent}
                      onChange={handleChange}
                      className={errors.consent ? 'input-error' : ''}
                    />
                    <span>I consent to being contacted by Khaki Academy regarding my enquiry.</span>
                  </label>
                  {errors.consent && <span className="contact__field-error">{errors.consent}</span>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg contact__submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="contact__spinner" />
                  ) : (
                    <><Send size={17} /> Submit Enquiry</>
                  )}
                </button>

                <p className="contact__disclaimer">
                  🔒 Your information is confidential and will only be used to respond to your enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
