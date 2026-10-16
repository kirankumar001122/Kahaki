import { GraduationCap } from 'lucide-react';
import './Trainers.css';

// Govardhan Krishna confirmed from the poster.
// Additional faculty cards are clearly marked as content placeholders.
const FACULTY = [
  {
    name: 'Govardhan Krishna',
    role: 'Founder — Khaki Academy',
    exp: 'Khaki Academy',
    speciality: 'Academic Coaching',
    bio: 'Govardhan Krishna is the founder of Khaki Academy, Malur — an Academy of Excellence committed to empowering students and professionals through quality education, effective communication, and practical skills.',
    hasPhoto: true,
    photo: '/images/govardhan-krishna.png',
  },
  {
    name: 'Faculty Member',
    role: '[Science Faculty — To Be Updated]',
    exp: 'Science Subjects',
    speciality: 'Science Coaching',
    bio: 'Khaki Academy has experienced faculty for Science subjects. Please contact the academy at 7338308071 for details about our Science teaching team.',
    hasPhoto: false,
    isPlaceholder: true,
  },
  {
    name: 'Faculty Member',
    role: '[Commerce Faculty — To Be Updated]',
    exp: 'Commerce Subjects',
    speciality: 'Commerce Coaching',
    bio: 'Khaki Academy has experienced faculty for Commerce subjects. Please contact the academy at 7338308071 for details about our Commerce teaching team.',
    hasPhoto: false,
    isPlaceholder: true,
  },
];

export default function Trainers() {
  return (
    <section id="trainers" className="trainers section">
      <div className="container">
        <div className="text-center fade-in">
          <p className="section-label">Our Faculty</p>
          <h2 className="section-title">Expert Faculty at Khaki Academy</h2>
          <p className="section-subtitle">
            Experienced, dedicated faculty committed to building strong academic foundations
            and helping every student achieve their educational goals.
          </p>
        </div>

        <div className="trainers__grid">
          {FACULTY.map((t, i) => (
            <div
              key={i}
              className="trainer-card fade-in"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="trainer-card__img-wrap">
                {t.hasPhoto ? (
                  <img
                    src={t.photo}
                    alt="Govardhan Krishna, Founder of Khaki Academy"
                    className="trainer-card__img"
                    loading="lazy"
                  />
                ) : (
                  <div className="trainer-card__avatar-placeholder">
                    <div className="trainer-card__avatar-icon">
                      <GraduationCap size={36} />
                    </div>
                    {t.isPlaceholder && (
                      <span className="trainer-card__avatar-label">Photo — To Be Updated</span>
                    )}
                  </div>
                )}
              </div>

              <div className="trainer-card__body">
                <div className="trainer-card__header">
                  <div>
                    <h3 className="trainer-card__name">{t.name}</h3>
                    <p className="trainer-card__role">{t.role}</p>
                  </div>
                </div>

                <div className="trainer-card__tags">
                  <span className="badge badge-gold">{t.exp}</span>
                </div>

                <p className="trainer-card__bio">{t.bio}</p>

                {t.isPlaceholder && (
                  <p className="trainer-card__placeholder-note">
                    📝 To be updated with verified faculty details.
                  </p>
                )}

                <div className="trainer-card__meta">
                  <div className="trainer-card__meta-item">
                    <span className="trainer-card__meta-num">{t.speciality.split(' ')[0]}</span>
                    <span className="trainer-card__meta-label">Speciality</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="trainers__note">
          * Faculty details based on official academy information. Contact{' '}
          <a href="tel:7338308071">7338308071</a> for complete faculty information.
        </p>
      </div>
    </section>
  );
}
