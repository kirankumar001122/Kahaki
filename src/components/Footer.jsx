import { Mic2, Share2, Globe, ArrowRight } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* CTA Banner */}
      <div className="footer__cta-banner">
        <div className="container footer__cta-inner">
          <div>
            <h2 className="footer__cta-title">Ready to Speak English with Confidence?</h2>
            <p className="footer__cta-sub">Join 5,000+ students who transformed their speaking skills with Khaki Academy.</p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => scrollTo('contact')}>
            Book Your Free Demo <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Main footer */}
      <div className="footer__main">
        <div className="container footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon"><Mic2 size={20} /></span>
              <span className="footer__logo-text">
                <span className="footer__logo-khaki">Khaki</span>
                <span className="footer__logo-academy"> Academy</span>
              </span>
            </div>
            <p className="footer__brand-tagline">Speak English with Confidence.</p>
            <p className="footer__brand-desc">
              India's trusted online spoken English academy helping students, professionals,
              and homemakers communicate with confidence since 2014.
            </p>
            <div className="footer__social">
              {[
                {
                  label: 'Instagram',
                  href: '#',
                  svg: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
                },
                {
                  label: 'YouTube',
                  href: '#',
                  svg: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>,
                },
                {
                  label: 'Facebook',
                  href: '#',
                  svg: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
                },
                {
                  label: 'Twitter / X',
                  href: '#',
                  svg: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l16 16M4 20L20 4"/></svg>,
                },
              ].map((s) => (
                <a key={s.label} href={s.href} className="footer__social-link" aria-label={s.label}>
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div className="footer__col">
            <h4 className="footer__col-title">Our Courses</h4>
            <ul className="footer__links">
              {['Spoken English Foundations', 'Professional Communication', 'Intensive Crash Course', 'Business English', 'Interview Preparation', 'Kids & Young Learners'].map((l) => (
                <li key={l}><button onClick={() => scrollTo('courses')} className="footer__link">{l}</button></li>
              ))}
            </ul>
          </div>

          {/* Academy */}
          <div className="footer__col">
            <h4 className="footer__col-title">Khaki Academy</h4>
            <ul className="footer__links">
              {[
                { label: 'About Us', id: 'about' },
                { label: 'Our Trainers', id: 'trainers' },
                { label: 'Why Choose Us', id: 'why' },
                { label: 'Testimonials', id: 'testimonials' },
                { label: 'Contact Us', id: 'contact' },
              ].map((l) => (
                <li key={l.label}><button onClick={() => scrollTo(l.id)} className="footer__link">{l.label}</button></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact Us</h4>
            <div className="footer__contact-items">
              <p className="footer__contact-item">📞 +91 98765 43210</p>
              <p className="footer__contact-item">✉️ hello@khakiacademy.com</p>
              <p className="footer__contact-item">🕐 Mon–Sat: 7 AM – 9 PM</p>
              <p className="footer__contact-item">📍 Online – Pan India</p>
            </div>
            <button
              className="footer__wa-btn"
              onClick={() => window.open(`https://wa.me/919876543210?text=${encodeURIComponent('Hi! I want to know more about Khaki Academy courses.')}`, '_blank')}
            >
              💬 WhatsApp Us
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} Khaki Academy. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
