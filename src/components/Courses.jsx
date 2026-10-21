import { useMemo } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import './Courses.css';
import { usePublishedContent } from '../hooks/usePublishedContent';

const COURSES = [
  {
    tag: 'English',
    tagColor: 'gold',
    level: '',
    title: 'Professional Spoken English',
    desc: 'Absolute Beginner to Advanced levels. American & British Accents. Fluent & Grammatically Correct.',
    features: [],
    img: '/images/academic-programme-1.png',
  },
  {
    tag: 'Computer',
    tagColor: 'navy',
    level: 'Digital Skills',
    title: 'Computer Training',
    desc: 'Practical computer skills training covering MS Office, Excel, Tally with GST, Python programming, Power BI, and AI basics for students and working professionals.',
    features: [
      'MS Office | Tally | GST',
      'Python | Power BI | Typing',
      'Practical & Career-Focused',
    ],
    img: '/images/academic-programme-2.png',
  },
  {
    tag: 'School',
    tagColor: 'gold',
    level: 'Classes 1–10',
    title: 'School Tuition',
    desc: 'Subject-wise coaching for Karnataka State Board, CBSE, ICSE and other board students from Classes 1 to 10, with homework support, chapter-wise assessments, and regular practice.',
    features: [
      'State | CBSE | ICSE',
      'All Subjects',
      'Regular Tests & Support',
    ],
    img: '/images/up.png',
  },
  {
    tag: 'PUC',
    tagColor: 'navy',
    level: 'Science & Commerce',
    title: '1st & 2nd PUC',
    desc: 'In-depth chapter-wise coaching for 1st and 2nd PUC Science (PCMB) and Commerce (Accountancy, Business Studies, Economics) with board exam preparation and mock tests.',
    features: [
      'PCMB | PCMC | Commerce',
      'Chapter-wise Teaching',
      'Exam Preparation',
    ],
    img: '/images/kak.png',
  },
  {
    tag: 'Foundation',
    tagColor: 'gold',
    level: 'Competitive Exam Prep',
    title: 'CET, NEET & JEE Foundation',
    desc: 'Concept-focused foundation preparation for CET, NEET and JEE. Suitable from Classes 8–10 onwards, with weekend classes, practice sessions, and regular revision.',
    features: [
      'Classes 8 – 10',
      'Concept Building',
      'Practice Tests & Expert Guidance',
    ],
    img: '/images/academic-programme-1.png',
  },
];

export default function Courses() {
  const { courses: publishedCourses } = usePublishedContent();
  const courses = useMemo(() => {
    if (publishedCourses.length === 0) return COURSES;
    return publishedCourses.map((course) => ({
      tag: course.category || 'Academic',
      tagColor: course.display_order % 2 === 0 ? 'gold' : 'navy',
      level: course.duration || '',
      title: course.title,
      desc: course.short_description || course.detailed_description,
      features: course.highlights || [],
      img: course.image_url || '/images/academic-programme-1.png',
    }));
  }, [publishedCourses]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="courses" className="courses section">
      <div className="container">
        <div className="text-center fade-in">
          <p className="section-label">All Courses</p>
          <h2 className="section-title">Academic Programmes at Khaki Academy</h2>
          <p className="section-subtitle">
            Explore academic tuition, Professional Spoken English, computer training, and competitive-exam
            foundation programmes. Contact the academy to confirm current schedules and fees.
          </p>
        </div>

        <div className="courses__grid">
          {courses.map((course, i) => (
            <div
              key={i}
              className={`course-card fade-in`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="course-card__img-wrap">
                <img src={course.img} alt={course.title} className="course-card__img" loading="lazy" />
                <span className={`course-card__tag course-card__tag--${course.tagColor}`}>{course.tag}</span>
              </div>

              <div className="course-card__body">
                {course.level && <p className="course-card__level">{course.level}</p>}
                <h3 className="course-card__title">{course.title}</h3>
                <p className="course-card__desc">{course.desc}</p>

                {course.features.length > 0 && (
                <ul className="course-card__features">
                  {course.features.map((f, j) => (
                    <li key={j} className="course-card__feature">
                      <CheckCircle size={14} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                )}

                <div className="course-card__footer">
                  <button className="btn btn-primary course-card__cta" onClick={scrollToContact}>
                    Enquire Now <ArrowRight size={15} />
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
            <p>Contact Khaki Academy and our team will help you find the right programme for your goals.</p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={scrollToContact}>
            Enquire for Admission <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
