import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    name: 'Sneha Patel',
    role: 'Software Engineer, Pune',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80&auto=format&fit=crop',
    rating: 5,
    text: 'I had severe fear of speaking English in meetings. After just 8 weeks at Khaki Academy, I confidently presented my project to an international team. The structured practice sessions and Priya ma\'am\'s constant encouragement made all the difference.',
    course: 'Professional Communication',
  },
  {
    name: 'Arjun Nair',
    role: 'MBA Student, Kochi',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80&auto=format&fit=crop',
    rating: 5,
    text: 'I cleared my GDPI rounds for top B-schools after training with Rahul sir. The mock GD sessions were incredibly realistic, and the feedback was always detailed and actionable. This is not just an English class — it is a career investment.',
    course: 'Professional Communication',
  },
  {
    name: 'Kavitha Reddy',
    role: 'Homemaker & Entrepreneur, Hyderabad',
    img: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=120&q=80&auto=format&fit=crop',
    rating: 5,
    text: 'As a homemaker who had not studied in years, I was nervous to join. But the warm, non-judgemental atmosphere made me feel safe to make mistakes. Today I run online cooking classes in English. Khaki Academy changed my life.',
    course: 'Spoken English Foundations',
  },
  {
    name: 'Rohan Gupta',
    role: 'BPO Team Leader, Delhi',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80&auto=format&fit=crop',
    rating: 5,
    text: 'I joined the Intensive Crash Course before my promotion interview. The 4-week immersive programme was intense but incredibly rewarding. Got the promotion, thanks to Khaki Academy!',
    course: 'Intensive Crash Course',
  },
  {
    name: 'Meera Joshi',
    role: 'Fresher Graduate, Mumbai',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80&auto=format&fit=crop',
    rating: 5,
    text: 'Before joining, my English was poor and I kept losing job interviews. After 3 months with Ananya ma\'am, my pronunciation improved so much that interviewers now compliment my communication. Just got my first job offer!',
    course: 'Spoken English Foundations',
  },
  {
    name: 'Sanjay Kulkarni',
    role: 'School Teacher, Nagpur',
    img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&q=80&auto=format&fit=crop',
    rating: 5,
    text: 'As an English teacher myself, I was sceptical. But the methodology here is brilliant — completely practical, conversation-based, and results-driven. My own classroom teaching improved dramatically after this course.',
    course: 'Professional Communication',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const total = TESTIMONIALS.length;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  const t = TESTIMONIALS[active];

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <div className="text-center fade-in">
          <p className="section-label">Testimonials</p>
          <h2 className="section-title">Hear it from Our Students</h2>
          <p className="section-subtitle">
            Real stories from real people who transformed their English speaking journey with Khaki Academy.
          </p>
        </div>

        {/* Featured testimonial */}
        <div className="testimonials__featured fade-in">
          <div className="testimonials__quote-icon"><Quote size={32} /></div>

          <div className="testimonials__content">
            <p className="testimonials__text">"{t.text}"</p>

            <div className="testimonials__author">
              <img src={t.img} alt={t.name} className="testimonials__author-img" />
              <div>
                <p className="testimonials__author-name">{t.name}</p>
                <p className="testimonials__author-role">{t.role}</p>
                <div className="testimonials__stars">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="#C6A15B" color="#C6A15B" />
                  ))}
                  <span className="testimonials__course">{t.course}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonials__controls">
            <button className="testimonials__btn" onClick={prev} aria-label="Previous">
              <ChevronLeft size={20} />
            </button>
            <div className="testimonials__dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`testimonials__dot ${i === active ? 'testimonials__dot--active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button className="testimonials__btn" onClick={next} aria-label="Next">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Mini cards grid */}
        <div className="testimonials__grid">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={i}
              className={`testi-mini ${i === active ? 'testi-mini--active' : ''} fade-in`}
              style={{ transitionDelay: `${i * 0.07}s` }}
              onClick={() => setActive(i)}
            >
              <div className="testi-mini__header">
                <img src={item.img} alt={item.name} className="testi-mini__img" />
                <div>
                  <p className="testi-mini__name">{item.name}</p>
                  <p className="testi-mini__role">{item.role}</p>
                </div>
              </div>
              <p className="testi-mini__excerpt">{item.text.slice(0, 90)}…</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
