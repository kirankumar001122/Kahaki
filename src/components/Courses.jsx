import { Clock, Users, BarChart2, CheckCircle, ArrowRight } from 'lucide-react';
import './Courses.css';

const COURSES = [
  {
    tag: 'Most Popular',
    tagColor: 'gold',
    level: 'Beginner → Intermediate',
    title: 'Spoken English Foundations',
    desc: 'Perfect for those starting from scratch. Build your grammar base, expand vocabulary, and overcome the fear of speaking.',
    duration: '8 Weeks',
    sessions: '24 Live Sessions',
    batchSize: 'Max 8 students',
    features: [
      'Grammar essentials & sentence structure',
      'Pronunciation & accent improvement',
      'Daily conversation practice',
      'Confidence-building exercises',
      'Progress assessments every 2 weeks',
    ],
    price: '₹4,999',
    originalPrice: '₹7,999',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=420&q=80&auto=format&fit=crop',
  },
  {
    tag: 'Career Booster',
    tagColor: 'navy',
    level: 'Intermediate → Advanced',
    title: 'Professional Communication',
    desc: 'Designed for working professionals and job seekers. Master business English, presentations, and interview skills.',
    duration: '10 Weeks',
    sessions: '30 Live Sessions',
    batchSize: 'Max 6 students',
    features: [
      'Business English & email writing',
      'Interview preparation & mock sessions',
      'Presentation & public speaking skills',
      'Group discussion practice',
      'Personality development coaching',
    ],
    price: '₹6,999',
    originalPrice: '₹10,999',
    img: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=420&q=80&auto=format&fit=crop',
  },
  {
    tag: 'Fast Track',
    tagColor: 'gold',
    level: 'All Levels',
    title: 'Intensive Crash Course',
    desc: 'Need results fast? This intensive 4-week crash course delivers maximum improvement in minimum time.',
    duration: '4 Weeks',
    sessions: '20 Live Sessions',
    batchSize: 'Max 5 students',
    features: [
      'Daily 1-hour live sessions',
      'Speaking fluency drills',
      'Real-life scenario practice',
      'One-on-one feedback sessions',
      'WhatsApp practice community',
    ],
    price: '₹3,499',
    originalPrice: '₹5,499',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=420&q=80&auto=format&fit=crop',
  },
];

export default function Courses() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="courses" className="courses section">
      <div className="container">
        <div className="text-center fade-in">
          <p className="section-label">Our Courses</p>
          <h2 className="section-title">Find the Right Course for Your Journey</h2>
          <p className="section-subtitle">
            Each course is thoughtfully designed for a specific stage of your English speaking journey
            — whether you are a complete beginner or a professional looking to refine your skills.
          </p>
        </div>

        <div className="courses__grid">
          {COURSES.map((course, i) => (
            <div
              key={i}
              className={`course-card fade-in ${i === 1 ? 'course-card--featured' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="course-card__img-wrap">
                <img src={course.img} alt={course.title} className="course-card__img" loading="lazy" />
                <span className={`course-card__tag course-card__tag--${course.tagColor}`}>{course.tag}</span>
              </div>

              <div className="course-card__body">
                <p className="course-card__level">{course.level}</p>
                <h3 className="course-card__title">{course.title}</h3>
                <p className="course-card__desc">{course.desc}</p>

                <div className="course-card__meta">
                  <span className="course-card__meta-item"><Clock size={14} />{course.duration}</span>
                  <span className="course-card__meta-item"><BarChart2 size={14} />{course.sessions}</span>
                  <span className="course-card__meta-item"><Users size={14} />{course.batchSize}</span>
                </div>

                <ul className="course-card__features">
                  {course.features.map((f, j) => (
                    <li key={j} className="course-card__feature">
                      <CheckCircle size={14} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="course-card__footer">
                  <div className="course-card__price-wrap">
                    <span className="course-card__price">{course.price}</span>
                    <span className="course-card__original">{course.originalPrice}</span>
                  </div>
                  <button className="btn btn-primary course-card__cta" onClick={scrollToContact}>
                    Enrol Now <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="courses__cta-strip fade-in">
          <div className="courses__cta-strip-text">
            <h3>Not sure which course is right for you?</h3>
            <p>Book a free 30-minute demo class and our counsellors will guide you to the perfect fit.</p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={scrollToContact}>
            Book Free Demo <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
