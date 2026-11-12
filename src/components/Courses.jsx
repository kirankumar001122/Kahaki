import { useEffect, useMemo, useState } from 'react';
import { CheckCircle, ArrowRight, ChevronDown } from 'lucide-react';
import './Courses.css';
import { usePublishedContent } from '../hooks/usePublishedContent';

const COURSES = [
  {
    tag: 'English',
    tagColor: 'gold',
    level: '',
    title: 'Professional Spoken English',
    desc: 'Build confident communication through practical, classroom-based spoken English training.',
    features: [
      'Speaking and conversation practice',
      'Grammar and vocabulary development',
      'Pronunciation and confidence building',
      'Interview preparation and communication skills',
      'Public speaking and presentation skills',
    ],
    img: '/images/professional-spoken-english.png',
  },
  {
    tag: 'Language & Communication',
    tagColor: 'navy',
    level: 'Online',
    title: 'Professional Spoken English — Online',
    desc: 'Develop confident English communication skills through structured online training, practical speaking activities, pronunciation improvement, grammar development and real-world communication practice.',
    features: [
      'English speaking and fluency development',
      'Accent training and pronunciation',
      'English grammar and sentence formation',
      'Professional communication',
      'Interview preparation',
      'Public speaking and presentation skills',
      'Practical conversation sessions',
    ],
    img: '/images/professional-spoken-english.png',
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
    img: '/images/computer-training-lab.png',
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
    img: '/images/8.PNG',
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
    img: '/images/1st.PNG',
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
    img: '/images/image.png',
  },
];

const COURSE_HIGHLIGHTS = {
  'professional spoken english': [
    'Speaking and conversation practice',
    'Grammar and vocabulary development',
    'Pronunciation and confidence building',
    'Interview preparation and communication skills',
    'Public speaking and presentation skills',
  ],
  'computer training': [
    'Computer fundamentals and digital literacy',
    'Practical productivity tools such as MS Office',
    'Hands-on computer exercises',
  ],
  'school tuition': [
    'Subject-wise learning and homework support',
    'Chapter-wise practice and assessment',
    'Regular revision and academic guidance',
  ],
  '1st & 2nd puc': [
    'Science and Commerce subject learning',
    'Board examination preparation',
    'Concept clarification and subject practice',
  ],
  'cet, neet & jee foundation': [
    'Competitive-exam foundation learning',
    'Conceptual understanding and problem-solving',
    'Subject-wise preparation and revision',
  ],
};

function normalizeCourseTitle(title) {
  return title.trim().toLowerCase().replace(/[^\w]+/g, ' ').replace(/\s+/g, ' ');
}

function CourseHighlights({ features, id, open, onToggle }) {
  return (
    <div className={`course-card__highlights ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="course-card__highlights-toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
      >
        <span>{open ? 'Hide course highlights' : `View course highlights (${features.length})`}</span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
      <div id={id} className="course-card__highlights-content" aria-hidden={!open}>
        <ul className="course-card__features">
          {features.map((f, j) => (
            <li key={j} className="course-card__feature">
              <CheckCircle size={14} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Courses() {
  const [openIndex, setOpenIndex] = useState(null);
  const { courses: publishedCourses } = usePublishedContent();

  /* Close the open highlights panel on outside click or Escape */
  useEffect(() => {
    if (openIndex === null) return undefined;
    const onPointerDown = (event) => {
      if (!event.target.closest('.course-card__highlights')) setOpenIndex(null);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpenIndex(null);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openIndex]);

  const courses = useMemo(() => {
    const cmsCourses = publishedCourses.map((course) => ({
      tag: course.category || 'Academic',
      tagColor: course.display_order % 2 === 0 ? 'gold' : 'navy',
      level: course.duration || '',
      title: course.title,
      desc: course.short_description || course.detailed_description,
      features: course.highlights?.length
        ? course.highlights
        : COURSE_HIGHLIGHTS[course.title.trim().toLowerCase()] || [],
      img: normalizeCourseTitle(course.title) === '1st 2nd puc'
        ? '/images/1st.PNG'
        : normalizeCourseTitle(course.title) === 'school tuition'
        ? '/images/8.PNG'
        : course.title.trim().toLowerCase().includes('cet') && course.title.trim().toLowerCase().includes('jee')
        ? '/images/image.png'
        : course.title.trim().toLowerCase().includes('professional spoken english')
        ? '/images/professional-spoken-english.png'
        : course.title.trim().toLowerCase() === 'computer training'
          ? '/images/computer-training-lab.png'
          : course.image_url || '/images/academic-programme-1.png',
    }));
    const fallbackCourses = COURSES.filter((course) =>
      !cmsCourses.some((published) => normalizeCourseTitle(published.title) === normalizeCourseTitle(course.title))
    );
    return [...cmsCourses, ...fallbackCourses];
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
          {courses.slice(1).map((course, i) => (
            <div
              key={i}
              className="course-card fade-in"
              data-open={openIndex === i ? 'true' : undefined}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className={`course-card__img-wrap ${course.img === '/images/image.png' ? 'course-card__img-wrap--full' : ''}`}>
                <img src={course.img} alt={course.title} className="course-card__img" loading="lazy" />
                <span className={`course-card__tag course-card__tag--${course.tagColor}`}>{course.tag}</span>
              </div>

              <div className="course-card__body">
                {course.level && <p className="course-card__level">{course.level}</p>}
                {normalizeCourseTitle(course.title) !== '1st 2nd puc' && (
                  <h3 className="course-card__title">{course.title}</h3>
                )}
                <p className="course-card__desc">{course.desc}</p>

                {course.features.length > 0 && (
                  <CourseHighlights
                    features={course.features}
                    id={`course-highlights-${i}`}
                    open={openIndex === i}
                    onToggle={() => setOpenIndex((current) => (current === i ? null : i))}
                  />
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
