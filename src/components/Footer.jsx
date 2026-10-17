import { ArrowRight } from 'lucide-react';
import './Footer.css';

const PHONE_1   = '7338308071';
const PHONE_2   = '7338308072';
const EMAIL     = 'khakiacademy03@gmail.com';
const WA_NUMBER = '917338308071';

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* CTA Banner */}
      <div className="footer__cta-banner">
        <div className="container footer__cta-inner">
          <div>
            <h2 className="footer__cta-title">Begin Your Academic Journey Today</h2>
            <p className="footer__cta-sub">
              Contact Khaki Academy for admissions to School Tuition, 1st &amp; 2nd PUC
              Science &amp; Commerce, CET / NEET / JEE Foundation, Spoken English,
              Computer Training, and Career Skills programmes.
            </p>
          </div>
          <button className="btn btn-outline-navy btn-lg" onClick={() => scrollTo('contact')}>
            Enquire for Admission <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Main footer */}
      <div className="footer__main">
        <div className="container footer__grid">

          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <img src="/khaki-logo.jpg" alt="Khaki Academy" className="footer__logo-img" />
            </div>
            <p className="footer__brand-tagline">Learn Today. Lead Tomorrow.</p>
            <p className="footer__brand-desc">
              Khaki Academy — Academy of Excellence, Malur. Empowering students and
              professionals through quality education, effective communication, and
              practical skills. Offline &amp; Live Online Programmes.
            </p>
            <div className="footer__social">
              {[
                {
                  label: 'YouTube',
                  href: '#',
                  svg: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>,
                },
                {
                  label: 'Instagram',
                  href: '#',
                  svg: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
                },
                {
                  label: 'Facebook',
                  href: '#',
                  svg: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
                },
              ].map((s) => (
                <a key={s.label} href={s.href} className="footer__social-link" aria-label={s.label}>
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__links">
              {[
                { label: 'Home',        id: 'home' },
                { label: 'About Us',    id: 'about' },
                { label: 'All Courses',     id: 'All  courses' },
                { label: 'Why Khaki',   id: 'why' },
                { label: 'Faculty',     id: 'trainers' },
                { label: 'Admissions',  id: 'contact' },
                { label: 'Contact Us',  id: 'contact' },
              ].map((l) => (
                <li key={l.label}>
                  <button onClick={() => scrollTo(l.id)} className="footer__link">{l.label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="footer__col">
            <h4 className="footer__col-title">Our Programmes</h4>
            <ul className="footer__links">
              {[
                'School Tuition (Classes 1–10)',
                '1st & 2nd PUC Science',
                '1st & 2nd PUC Commerce',
                'CET Foundation',
                'NEET Foundation',
                'JEE Foundation',
                'Professional Spoken English',
                'Computer Training',
                'Career & Professional Skills',
              ].map((l) => (
                <li key={l}>
                  <button onClick={() => scrollTo('All courses')} className="footer__link">{l}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact Us</h4>
            <div className="footer__contact-items">
              <p className="footer__contact-item">
                📞 <a href={`tel:${PHONE_1}`}>{PHONE_1}</a>
              </p>
              <p className="footer__contact-item">
                📞 <a href={`tel:${PHONE_2}`}>{PHONE_2}</a>
              </p>
              <p className="footer__contact-item">
                ✉️ <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </p>
              <p className="footer__contact-item">
                🕕 Batch Hours: 6:00 AM – 10:00 PM
              </p>
              <p className="footer__contact-item">
                <a
                  href="https://maps.app.goo.gl/3FeizTNvzi8PYoSr9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📍 Opp. Anjaneyaswamy Temple, Above Sowparnika Bakery, Malur to Hosur Road,
                  Near Railway Station, Malur – 563130, Karnataka
                </a>
              </p>
            </div>
            <button
              className="footer__wa-btn"
              onClick={() =>
                window.open(
                  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hi Khaki Academy! I want to know more about your courses.')}`,
                  '_blank'
                )
              }
            >
              💬 WhatsApp Us
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} Khaki Academy — Academy of Excellence, Malur. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Admission &amp; Enrolment Policy</a>
            <a href="#">Fee Payment Policy</a>
            <a href="#">Cancellation &amp; Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
