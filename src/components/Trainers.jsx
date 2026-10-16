import { Link2, Star } from 'lucide-react';
import './Trainers.css';

const TRAINERS = [
  {
    name: 'Priya Sharma',
    role: 'Head Trainer & Founder',
    exp: '12 Years Experience',
    speciality: 'Fluency Building • Business English',
    bio: 'CELTA certified with an MA in English Literature. Priya has coached 2,000+ professionals and students across India in spoken English and communication skills.',
    rating: 4.9,
    students: '2,000+',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop&faces=1',
  },
  {
    name: 'Rahul Mehta',
    role: 'Senior Communication Coach',
    exp: '9 Years Experience',
    speciality: 'Interview Prep • Public Speaking',
    bio: 'Former corporate trainer for Fortune 500 companies. Rahul specialises in helping job seekers and professionals crack high-stakes interviews with confidence.',
    rating: 4.8,
    students: '1,500+',
    img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80&auto=format&fit=crop',
  },
  {
    name: 'Ananya Krishnan',
    role: 'Pronunciation & Accent Coach',
    exp: '7 Years Experience',
    speciality: 'Pronunciation • Accent Neutralisation',
    bio: 'Trained in phonetics and linguistics, Ananya helps learners refine their pronunciation, eliminate mother tongue influence, and develop a clear, confident accent.',
    rating: 4.9,
    students: '900+',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&auto=format&fit=crop',
  },
  {
    name: 'Vikram Desai',
    role: 'Beginners & Kids English Trainer',
    exp: '6 Years Experience',
    speciality: 'Beginner Adults • Young Learners',
    bio: 'Vikram has a special gift for making complete beginners feel at ease. His patience, encouragement, and structured approach help shy learners find their voice.',
    rating: 4.8,
    students: '700+',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
  },
];

export default function Trainers() {
  return (
    <section id="trainers" className="trainers section">
      <div className="container">
        <div className="text-center fade-in">
          <p className="section-label">Our Trainers</p>
          <h2 className="section-title">Learn from India's Best Spoken English Coaches</h2>
          <p className="section-subtitle">
            All our trainers are certified, experienced, and deeply passionate about helping
            you find your English-speaking voice.
          </p>
        </div>

        <div className="trainers__grid">
          {TRAINERS.map((t, i) => (
            <div
              key={i}
              className="trainer-card fade-in"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="trainer-card__img-wrap">
                <img src={t.img} alt={t.name} className="trainer-card__img" loading="lazy" />
                <div className="trainer-card__rating">
                  <Star size={12} fill="#C6A15B" color="#C6A15B" />
                  <span>{t.rating}</span>
                </div>
              </div>

              <div className="trainer-card__body">
                <div className="trainer-card__header">
                  <div>
                    <h3 className="trainer-card__name">{t.name}</h3>
                    <p className="trainer-card__role">{t.role}</p>
                  </div>
                  <a href="#contact" className="trainer-card__linkedin" aria-label="LinkedIn">
                    <Link2 size={16} />
                  </a>
                </div>

                <div className="trainer-card__tags">
                  <span className="badge badge-gold">{t.exp}</span>
                </div>

                <p className="trainer-card__bio">{t.bio}</p>

                <div className="trainer-card__meta">
                  <div className="trainer-card__meta-item">
                    <span className="trainer-card__meta-num">{t.students}</span>
                    <span className="trainer-card__meta-label">Students Trained</span>
                  </div>
                  <div className="trainer-card__meta-divider"></div>
                  <div className="trainer-card__meta-item">
                    <span className="trainer-card__meta-num">{t.speciality.split('•')[0].trim()}</span>
                    <span className="trainer-card__meta-label">Core Speciality</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
