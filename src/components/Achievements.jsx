import { useState, useEffect, useCallback } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import './Achievements.css';

/**
 * All five achievement images are sourced from public/images/.
 * Captions are based on text visible in the images themselves.
 */
const ACHIEVEMENTS = [
  {
    img: '/images/Gov.jpeg',
    tag: 'America Book of Records',
    title: 'Maximum English Grammar Formula Written',
    caption:
      'Certified by the America Book of Records for writing 7000 English Grammar Formulae in 4 hours 55 minutes at Government First Grade College, Malur on 20 February 2023. Certificate No. 002023-017.',
    type: 'photo',
  },
  {
    img: '/images/Gov2.jpeg',
    tag: "Kalam's World Records",
    title: "Kalam's World Records — Record Holder 2023",
    caption:
      "Govardhan K R is recognised as a Record Holder by Kalam's World Records (The Place of Legends) in 2023 for his achievement in writing English Grammar Formulae.",
    type: 'award-graphic',
  },
  {
    img: '/images/Gov3.JPG',
    tag: "Kalam's World Records",
    title: '7000 English Grammar Formulae in 4 Hours 55 Minutes',
    caption:
      "Govardhan KR, from Kolar, Karnataka, created a new world record recognised by Kalam's World Records by writing 7000 English Grammar Formulae in 4 hours 55 minutes 02 seconds. World Record dated 01-03-2023.",
    type: 'certificate',
  },
  {
    img: '/images/Gov4.PNG',
    tag: 'High Range Book of World Records',
    title: 'Most Number of English Formula Written by an Individual',
    caption:
      'High Range Book of World Records (HRBWR 3874) certified that Govardhan KR wrote 7000 English Grammar Formulae in 4 hours 55 minutes and 2 seconds at Government First Grade College, Malur on 20 February 2023. Issued 23 May 2023, Accredited by UK body.',
    type: 'certificate',
  },
  {
    img: '/images/Gov5.jpeg',
    tag: 'Exclusive World Records',
    title: 'Writing Most English Grammar Formulas by an Individual',
    caption:
      'Exclusive World Records certified Govardhan K R of Kolar, Karnataka for writing 7000 English Grammar Formulas in 4 hours 55 minutes and 02 seconds at GFGC Malur, Kolar District on 20 February 2023. Certificate dated March 17, 2023.',
    type: 'certificate',
  },
];

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

  return (
    <>
      <section id="achievements" className="achievements section">
        <div className="container">

          {/* ── Section header ─────────────────────────────────── */}
          <div className="text-center fade-in">
            <p className="section-label">Founder Achievements &amp; Recognition</p>
            <h2 className="section-title">Recognitions of Govardhan Krishna</h2>
            <p className="section-subtitle">
              Celebrating the achievements, milestones, and dedication of Govardhan Krishna,
              Founder of Khaki Academy.
            </p>
          </div>

          {/* ── Intro banner ───────────────────────────────────── */}
          <div className="achievements__banner fade-in">
            <div className="achievements__banner-icon">
              <Award size={26} />
            </div>
            <div className="achievements__banner-body">
              <p className="achievements__banner-headline">
                A record certified by multiple national and international organisations
              </p>
              <p className="achievements__banner-text">
                Govardhan Krishna, founder of Khaki Academy, set a record by writing
                <strong> 7000 English Grammar Formulae in 4 hours 55 minutes </strong>
                at Government First Grade College, Malur on 20 February 2023. This feat was
                independently certified by the America Book of Records, Kalam's World Records,
                High Range Book of World Records, and Exclusive World Records. Click any
                card below to view the full certificate.
              </p>
            </div>
          </div>

          {/* ── Achievement gallery ────────────────────────────── */}
          <div className="achievements__grid">
            {ACHIEVEMENTS.map((item, i) => (
              <div
                key={i}
                className="ach-card fade-in"
                style={{ transitionDelay: `${i * 0.08}s` }}
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                aria-label={`View full image: ${item.title}`}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
              >
                {/* Image area — unified fixed height for all cards */}
                <div className="ach-card__img-wrap">
                  <img
                    src={item.img}
                    alt={item.title}
                    className={`ach-card__img ach-card__img--${item.type}`}
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="ach-card__overlay" aria-hidden="true">
                    <ZoomIn size={20} />
                    <span>View Full Image</span>
                  </div>
                </div>

                {/* Text body */}
                <div className="ach-card__body">
                  <span className="ach-card__tag">{item.tag}</span>
                  <h3 className="ach-card__title">{item.title}</h3>
                  <p className="ach-card__caption">{item.caption}</p>
                </div>
              </div>
            ))}
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
