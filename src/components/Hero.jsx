import { ArrowRight, Play, Star, Users, Award } from 'lucide-react';
import './Hero.css';

export default function Hero() {
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
            <Star size={12} fill="currentColor" />
            India's Most Trusted Spoken English Academy
          </div>

          <h1 className="hero__headline">
            Your English.{' '}
            <span className="hero__headline-accent">Your Confidence.</span>{' '}
            Your Future.
          </h1>

          <p className="hero__subheadline">
            Speak English naturally, confidently, and fluently with practical online classes
            designed for real-life conversations, interviews, and career growth.
          </p>

          <div className="hero__trust">
            <span>✓ Practical learning</span>
            <span>✓ Interactive sessions</span>
            <span>✓ Confidence-building practice</span>
          </div>

          <div className="hero__actions">
            <button className="btn btn-primary btn-lg" onClick={() => scrollTo('contact')}>
              Book Your Free Demo
              <ArrowRight size={18} />
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => scrollTo('courses')}>
              <Play size={16} fill="currentColor" />
              Explore Courses
            </button>
          </div>

          {/* Stats row */}
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">5,000+</span>
              <span className="hero__stat-label">Students Trained</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-num">98%</span>
              <span className="hero__stat-label">Satisfaction Rate</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-num">8+</span>
              <span className="hero__stat-label">Expert Trainers</span>
            </div>
          </div>
        </div>

        {/* Visual column */}
        <div className="hero__visual">
          <div className="hero__img-frame">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=680&q=85&auto=format&fit=crop"
              alt="Indian students learning spoken English online"
              className="hero__img"
              loading="eager"
            />
            {/* Floating card 1 */}
            <div className="hero__float hero__float--1">
              <div className="hero__float-icon"><Award size={18} /></div>
              <div>
                <p className="hero__float-title">Expert Trainers</p>
                <p className="hero__float-sub">Certified & Experienced</p>
              </div>
            </div>
            {/* Floating card 2 */}
            <div className="hero__float hero__float--2">
              <div className="hero__float-icon hero__float-icon--gold"><Users size={18} /></div>
              <div>
                <p className="hero__float-title">Live Classes</p>
                <p className="hero__float-sub">Small Batches • Personal Attention</p>
              </div>
            </div>
            {/* Floating rating */}
            <div className="hero__rating">
              <div className="hero__rating-stars">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={13} fill="#C6A15B" color="#C6A15B" />
                ))}
              </div>
              <p className="hero__rating-text">4.9 / 5 from 1,200+ reviews</p>
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
