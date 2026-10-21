import { ArrowRight, Play, Award, Users } from 'lucide-react';
import './Hero.css';
import { findPublishedSection, usePublishedContent } from '../hooks/usePublishedContent';

export default function Hero() {
  const { sections } = usePublishedContent();
  const content = findPublishedSection(sections, 'home', 'hero');
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      {/* Background */}
      <div className="hero__bg">
        <div className="hero__bg-pattern"></div>
        <div className="hero__bg-gradient"></div>
      </div>

      <div className="container hero__container">
        {/* Content column */}
        <div className="hero__content">
          <div className="badge badge-gold hero__badge">
            KHAKI ACADEMY · ACADEMY OF EXCELLENCE
          </div>

          <h1 className="hero__headline">
            {content?.title || 'Learn Today. Lead Tomorrow.'}
          </h1>

          <p className="hero__subheadline">
            {content?.subtitle || 'Khaki Academy'}
          </p>

          <p className="hero__desc">
            {content?.body || 'Empowering students and professionals through quality education, effective communication, and practical skills. Malur, Karnataka · Offline & Live Online Programmes.'}
          </p>

          <div className="hero__trust">
            <span>✓ PUC Science &amp; Commerce</span>
            <span>✓ CET / NEET / JEE Foundation</span>
            <span>✓ Professional Spoken English &amp; Computer Training</span>
          </div>

          <div className="hero__actions">
            <button className="btn btn-primary btn-lg" onClick={() => scrollTo('courses')}>
              Explore Courses
              <ArrowRight size={18} />
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => scrollTo('contact')}>
              <Play size={16} fill="currentColor" />
              Enquire for Admission
            </button>
          </div>

          {/* Info strip — batch timings */}
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">🕕 6 AM – 10 PM</span>
              <span className="hero__stat-label">Batch Hours</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-num">📞</span>
              <span className="hero__stat-label">7338308071</span>
            </div>
          </div>
        </div>

        {/* Visual column */}
        <div className="hero__visual">
          <div className="hero__img-frame">
            <img
              src={content?.image_url || '/images/kak.png'}
              alt={content?.image_alt || 'Students studying in a smart classroom at Khaki Academy Malur'}
              className="hero__img"
              loading="eager"
            />
            {/* Floating card 1 */}
            <div className="hero__float hero__float--1">
              <div className="hero__float-icon">
                <Award size={18} />
              </div>
              <div>
                <p className="hero__float-title">Expert Faculty</p>
                <p className="hero__float-sub">Experienced &amp; Dedicated</p>
              </div>
            </div>
            {/* Floating card 2 */}
            <div className="hero__float hero__float--2">
              <div className="hero__float-icon hero__float-icon--gold">
                <Users size={18} />
              </div>
              <div>
                <p className="hero__float-title">Limited Batches</p>
                <p className="hero__float-sub">Personalised Attention</p>
              </div>
            </div>
            {/* Contact tag */}
            <div className="hero__rating">
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dark)', fontWeight: 600 }}>
                📍 Near Railway Station, Malur – 563130
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="hero__wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FAF8F3"/>
        </svg>
      </div>
    </section>
  );
}
