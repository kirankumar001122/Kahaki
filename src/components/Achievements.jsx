import { useState, useEffect, useCallback } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Award, Trophy } from 'lucide-react';
import './Achievements.css';

/**
 * All achievement images are sourced from public/images/.
 * Captions are based on text visible in the images themselves.
 */
const ACHIEVEMENTS = [
  /* ── Photo ───────────────────────────────────────────────── */
  {
    img: '/images/cert-govardhan.jpg',
    tag: 'World Record Achievement',
    title: 'Govardhan Krishna — World Record Holder',
    caption:
      'Govardhan Krishna holding his world record certificate and trophy, certified for writing 7,000 English Grammar Formulae in 4 hours 55 minutes and 02 seconds at Government First Grade College, Malur on 20 February 2023.',
    type: 'photo',
  },
  /* ── Certificates ────────────────────────────────────────── */
  {
    img: '/images/cert-highrange.jpg',
    tag: 'High Range Book of World Records',
    title: 'Most Number of English Formula Written by an Individual',
    caption:
      'High Range Book of World Records (HRBWR 3874) certified Govardhan KR for writing 7,000 English Grammar Formulae in 4 hours 55 minutes and 2 seconds at Government First Grade College, Malur on 20 February 2023. Issued 23 May 2023.',
    type: 'certificate',
  },
  {
    img: '/images/cert-kings.jpg',
    tag: "King's Book of World Records",
    title: 'Amazing Brilliance — Most English Grammar Formulas',
    caption:
      "Govardhan K R of Kolar, Karnataka was selected for the title 'Amazing Brilliance' by King's Book of World Records for writing 7,000 English Grammar Formulas in 4 hours 55 minutes and 02 seconds at GFGC Malur. Dated March 16, 2023.",
    type: 'certificate',
  },
  {
    img: '/images/cert-exclusive.jpg',
    tag: 'Exclusive World Records',
    title: 'Most English Grammar Formulas by an Individual',
    caption:
      'Exclusive World Records certified Govardhan K R of Kolar, Karnataka for writing 7,000 English Grammar Formulas in 4 hours 55 minutes and 02 seconds at GFGC Malur on 20 February 2023. Certificate dated March 17, 2023.',
    type: 'certificate',
  },
  {
    img: '/images/cert-worldwide2.png',
    tag: 'Worldwide Book of Records',
    title: 'Maximum English Grammar Formulae Written by an Individual',
    caption:
      'Worldwide Book of Records Limited certified Govardhan K R (Karnataka, India) as a Record Holder for the world record of Maximum English Grammar Formulae Written by an Individual — 7,000 formulae in 4 hours 55 minutes and 2 seconds on 20 February 2023 at Government First Grade College, Malur.',
    type: 'certificate',
  },
  {
    img: '/images/cert-america.jpg',
    tag: 'America Book of Records',
    title: 'Maximum English Grammar Formula Written',
    caption:
      'America Book of Records certified Govardhan K R (Founder of Khaki Academy, Malur) from Karnataka, India for writing 7,000 English Grammar Formulae in 4 hours 55 minutes 2 seconds on 20 February 2023 at Government First Grade College, Malur, Bengaluru. Certificate dated June 20, 2023.',
    type: 'certificate',
  },
];

const photos = ACHIEVEMENTS.filter((a) => a.type === 'photo');
const certificates = ACHIEVEMENTS.filter((a) => a.type === 'certificate');

export default function Achievements() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + ACHIEVEMENTS.length) % ACHIEVEMENTS.length);
  }, []);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % ACHIEVEMENTS.length);
  }, []);

  /* Keyboard navigation */
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightboxIndex, prev, next]);

  /* Prevent body scroll when lightbox is open */
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  const current = lightboxIndex !== null ? ACHIEVEMENTS[lightboxIndex] : null;

  /* Get ACHIEVEMENTS-level index from a photo/certificate sub-array index */
  const getGlobalIndex = (item) => ACHIEVEMENTS.indexOf(item);

  return (
    <>
      <section id="achievements" className="achievements section">
        <div className="container">

          {/* ── Section header ─────────────────────────────────── */}
          <div className="text-center fade-in">
            <p className="section-label">Certifications &amp; World Records</p>
            <h2 className="section-title">Founder's World Record Certifications</h2>
            <p className="section-subtitle">
              Govardhan Krishna, Founder &amp; Managing Director of Khaki Academy, holds
              multiple internationally recognised world records in English Grammar.
            </p>
          </div>

          {/* ── Stats strip ────────────────────────────────────── */}
          <div className="achievements__stats fade-in">
            <div className="achievements__stat">
              <Trophy size={22} />
              <div>
                <span className="achievements__stat-number">7,000</span>
                <span className="achievements__stat-label">Grammar Formulae</span>
              </div>
            </div>
            <div className="achievements__stat-divider" />
            <div className="achievements__stat">
              <Award size={22} />
              <div>
                <span className="achievements__stat-number">5</span>
                <span className="achievements__stat-label">World Record Certifications</span>
              </div>
            </div>
            <div className="achievements__stat-divider" />
            <div className="achievements__stat">
              <Award size={22} />
              <div>
                <span className="achievements__stat-number">4h 55m</span>
                <span className="achievements__stat-label">Record Time</span>
              </div>
            </div>
          </div>

          {/* ── Banner ─────────────────────────────────────────── */}
          <div className="achievements__banner fade-in">
            <div className="achievements__banner-icon">
              <Award size={26} />
            </div>
            <div className="achievements__banner-body">
              <p className="achievements__banner-headline">
                A record certified by multiple national &amp; international organisations
              </p>
              <p className="achievements__banner-text">
                Govardhan Krishna set a world record by writing
                <strong> 7,000 English Grammar Formulae in 4 hours 55 minutes </strong>
                at Government First Grade College, Malur on 20 February 2023 — independently certified
                by the High Range Book of World Records, King's Book of World Records,
                Exclusive World Records, Worldwide Book of Records, and America Book of Records.
              </p>
            </div>
          </div>

          {/* ── Photo highlights (2 photos side by side) ────────── */}
          <h3 className="achievements__group-title fade-in">
            <Trophy size={18} /> Award Ceremony Highlights
          </h3>
          <div className="achievements__photos fade-in">
            {photos.map((item) => {
              const gi = getGlobalIndex(item);
              return (
                <div
                  key={gi}
                  className="ach-photo-card fade-in"
                  onClick={() => openLightbox(gi)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View full image: ${item.title}`}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(gi)}
                >
                  <div className="ach-photo-card__img-wrap">
                    <img src={item.img} alt={item.title} className="ach-photo-card__img" loading="lazy" />
                    <div className="ach-card__overlay" aria-hidden="true">
                      <ZoomIn size={22} />
                      <span>View Full Image</span>
                    </div>
                  </div>
                  <div className="ach-photo-card__body">
                    <span className="ach-card__tag">{item.tag}</span>
                    <h4 className="ach-photo-card__title">{item.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Certificates grid (3 cols) ─────────────────────── */}
          <h3 className="achievements__group-title fade-in">
            <Award size={18} /> Official Certificates
          </h3>
          <div className="achievements__certs fade-in">
            {certificates.map((item) => {
              const gi = getGlobalIndex(item);
              return (
                <div
                  key={gi}
                  className="ach-cert-card fade-in"
                  style={{ transitionDelay: `${(gi % 3) * 0.06}s` }}
                  onClick={() => openLightbox(gi)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View full certificate: ${item.title}`}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(gi)}
                >
                  <div className="ach-cert-card__frame">
                    <img src={item.img} alt={item.title} className="ach-cert-card__img" loading="lazy" />
                    <div className="ach-card__overlay" aria-hidden="true">
                      <ZoomIn size={20} />
                      <span>View Certificate</span>
                    </div>
                  </div>
                  <div className="ach-cert-card__body">
                    <span className="ach-card__tag">{item.tag}</span>
                    <h4 className="ach-cert-card__title">{item.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      {current && (
        <div
          className="ach-lb"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={closeLightbox}
        >
          <button className="ach-lb__close" onClick={closeLightbox} aria-label="Close lightbox">
            <X size={20} />
          </button>

          <button className="ach-lb__nav ach-lb__nav--prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous image">
            <ChevronLeft size={22} />
          </button>

          <div className="ach-lb__inner" onClick={(e) => e.stopPropagation()}>
            <div className="ach-lb__img-wrap">
              <img
                src={current.img}
                alt={current.title}
                className="ach-lb__img"
              />
            </div>
            <div className="ach-lb__caption">
              <span className="ach-lb__tag">{current.tag}</span>
              <h3 className="ach-lb__title">{current.title}</h3>
              <p className="ach-lb__text">{current.caption}</p>
              <p className="ach-lb__counter">{lightboxIndex + 1} of {ACHIEVEMENTS.length}</p>
            </div>
          </div>

          <button className="ach-lb__nav ach-lb__nav--next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next image">
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </>
  );
}
