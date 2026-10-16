import { useState } from 'react';
import { Send, Phone, Mail, MapPin, MessageCircle, CheckCircle } from 'lucide-react';
import './Contact.css';

const WHATSAPP_NUMBER = '919876543210'; // Replace with real number

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent('Hi Khaki Academy! I want to book a free demo class.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="text-center fade-in">
          <p className="section-label">Get in Touch</p>
          <h2 className="section-title">Book Your Free Demo Class Today</h2>
          <p className="section-subtitle">
            Fill in the form below or reach us directly on WhatsApp. We will get back to you
            within 24 hours to schedule your personalised demo session.
          </p>
        </div>

        <div className="contact__grid">
          {/* Info panel */}
          <div className="contact__info fade-in-left">
            <div className="contact__info-card">
              <h3 className="contact__info-heading">We'd Love to Hear from You</h3>
              <p className="contact__info-sub">
                Whether you have a question about our courses, want to understand our methodology,
                or are ready to start your English journey — we are here to help.
              </p>

              <div className="contact__info-items">
                <div className="contact__info-item">
                  <span className="contact__info-icon"><Phone size={18} /></span>
                  <div>
                    <p className="contact__info-label">Call / WhatsApp</p>
                    <a href={`tel:+${WHATSAPP_NUMBER}`} className="contact__info-value">+91 98765 43210</a>
                  </div>
                </div>
                <div className="contact__info-item">
                  <span className="contact__info-icon"><Mail size={18} /></span>
                  <div>
                    <p className="contact__info-label">Email Us</p>
                    <a href="mailto:hello@khakiacademy.com" className="contact__info-value">hello@khakiacademy.com</a>
                  </div>
                </div>
                <div className="contact__info-item">
                  <span className="contact__info-icon"><MapPin size={18} /></span>
                  <div>
                    <p className="contact__info-label">Location</p>
                    <p className="contact__info-value">Online – Available Pan India</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <button className="contact__whatsapp-btn" onClick={openWhatsApp}>
                <MessageCircle size={20} />
                Chat with Us on WhatsApp
              </button>

              {/* Timings */}
              <div className="contact__timings">
                <p className="contact__timings-title">Class Timings</p>
                <div className="contact__timings-rows">
                  <div className="contact__timing-row">
                    <span>Morning Batch</span>
                    <span>7:00 AM – 10:00 AM</span>
                  </div>
                  <div className="contact__timing-row">
                    <span>Afternoon Batch</span>
                    <span>12:00 PM – 3:00 PM</span>
                  </div>
                  <div className="contact__timing-row">
                    <span>Evening Batch</span>
                    <span>6:00 PM – 9:00 PM</span>
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
                <h3>Thank You, {form.name || 'there'}! 🎉</h3>
                <p>
                  Your demo class request has been received. Our team will call or WhatsApp
                  you within 24 hours to confirm your slot. Get ready to start speaking!
                </p>
                <button className="btn btn-primary" onClick={() => { setSubmitted(false); setForm({ name:'', email:'', phone:'', course:'', message:'' }); }}>
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <h3 className="contact__form-title">Request a Free Demo</h3>

                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name" name="name" type="text" required
                      placeholder="e.g. Priya Sharma"
                      value={form.name} onChange={handleChange}
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="phone">Phone / WhatsApp *</label>
                    <input
                      id="phone" name="phone" type="tel" required
                      placeholder="e.g. 9876543210"
                      value={form.phone} onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact__field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email" name="email" type="email"
                    placeholder="e.g. priya@email.com"
                    value={form.email} onChange={handleChange}
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="course">Course Interested In</label>
                  <select id="course" name="course" value={form.course} onChange={handleChange}>
                    <option value="">— Select a Course —</option>
                    <option value="foundations">Spoken English Foundations</option>
                    <option value="professional">Professional Communication</option>
                    <option value="intensive">Intensive Crash Course</option>
                    <option value="not-sure">Not Sure Yet (Help Me Choose)</option>
                  </select>
                </div>

                <div className="contact__field">
                  <label htmlFor="message">Tell Us About Yourself (optional)</label>
                  <textarea
                    id="message" name="message" rows={4}
                    placeholder="e.g. I am a job seeker and want to improve my English for interviews..."
                    value={form.message} onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg contact__submit" disabled={loading}>
                  {loading ? (
                    <span className="contact__spinner" />
                  ) : (
                    <>
                      <Send size={17} />
                      Book My Free Demo Class
                    </>
                  )}
                </button>

                <p className="contact__disclaimer">
                  🔒 Your information is 100% safe and will never be shared. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
