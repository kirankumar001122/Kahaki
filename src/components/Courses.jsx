import { CheckCircle, ArrowRight } from 'lucide-react';
import './Courses.css';

const COURSES = [
  {
    tag: 'English',
    tagColor: 'gold',
    level: 'Professional Development',
    title: 'Professional Spoken English',
    desc: 'Transform your English communication with our structured, results-driven programme. From building foundational fluency to mastering professional business communication, we cover every aspect of spoken English — pronunciation, grammar, vocabulary, and real-world conversation.',
    features: [
      'Level 1: Foundation — Basics & Sentence Building',
      'Level 2: Intermediate — Confident Conversation',
      'Level 3: Advanced — Fluency & Expression',
      'Level 4: Professional — Business & Corporate English',
      'Pronunciation, Accent & Grammar Mastery',
      'Interview Preparation & Public Speaking',
    ],
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=90&auto=format&fit=crop',
  },
  {
    tag: 'School',
    tagColor: 'gold',
    level: 'Classes 1–10',
    title: 'School Tuition Classes',
    desc: 'Subject-wise coaching for Karnataka State Board, CBSE, ICSE and other board students from Classes 1 to 10, with homework support, chapter-wise assessments, and regular practice.',
    features: [
      'Karnataka State Board, CBSE & ICSE',
      'Mathematics & Science',
      'English & Kannada',
      'Social Studies',
      'Homework Support',
      'Regular Assessments',
    ],
    img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=90&auto=format&fit=crop',
  },
  {
    tag: 'PUC',
    tagColor: 'navy',
    level: 'Science & Commerce',
    title: '1st & 2nd PUC',
    desc: 'In-depth chapter-wise coaching for 1st and 2nd PUC Science (PCMB) and Commerce (Accountancy, Business Studies, Economics) with board exam preparation and mock tests.',
    features: [
      'Physics, Chemistry, Mathematics',
      'Biology & Computer Science',
      'Accountancy & Business Studies',
      'Economics & Statistics',
      'Chapter-wise Revision',
      'Mock Tests',
    ],
    img: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=600&q=90&auto=format&fit=crop',
  },
  {
    tag: 'Computer',
    tagColor: 'navy',
    level: 'Digital Skills',
    title: 'Computer Training',
    desc: 'Practical computer skills training covering MS Office, Excel, Tally with GST, Python programming, Power BI, and AI basics for students and working professionals.',
    features: [
      'MS Office & Excel',
      'Tally with GST',
      'Python Programming',
      'Power BI',
      'AI & Digital Literacy Basics',
    ],
    img: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=90&auto=format&fit=crop',
  },
  {
    tag: 'Foundation',
    tagColor: 'gold',
    level: 'Competitive Exam Prep',
    title: 'CET / NEET / JEE Foundation',
    desc: 'Concept-focused foundation preparation for CET, NEET and JEE. Suitable from Classes 8–10 onwards, with weekend classes, practice sessions, and regular revision.',
    features: [
      'CET — Physics, Chemistry, Maths/Biology',
      'NEET — Physics, Chemistry, Biology',
      'JEE — Physics, Chemistry, Mathematics',
      'Concept-Based Learning',
      'Weekend Classes Available',
      'Mock Tests & Revision',
    ],
    img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=90&auto=format&fit=crop',
  },
  {
    tag: 'Career',
    tagColor: 'navy',
    level: 'Professional Skills',
    title: 'Career & Professional Skills',
    desc: 'Practical career development training including soft skills, interview preparation, digital literacy, and corporate communication for students and working professionals.',
    features: [
      'Soft Skills Training',
      'Interview Preparation',
      'Digital Literacy',
      'Corporate Communication',
      'Resume Building',
    ],
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=90&auto=format&fit=crop',
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
          <p className="section-label">All Courses</p>
          <h2 className="section-title">Academic Programmes at Khaki Academy</h2>
          <p className="section-subtitle">
            Explore academic tuition, Professional Spoken English, computer training, and competitive-exam
            foundation programmes. Contact the academy to confirm current schedules and fees.
          </p>
        </div>

        <div className="courses__grid">
          {COURSES.map((course, i) => (
            <div
              key={i}
              className={`course-card fade-in ${i === 1 ? 'course-card--featured' : ''}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="course-card__img-wrap">
                <img src={course.img} alt={course.title} className="course-card__img" loading="lazy" />
                <span className={`course-card__tag course-card__tag--${course.tagColor}`}>{course.tag}</span>
              </div>

              <div className="course-card__body">
                <p className="course-card__level">{course.level}</p>
                <h3 className="course-card__title">{course.title}</h3>
                <p className="course-card__desc">{course.desc}</p>

                <ul className="course-card__features">
                  {course.features.map((f, j) => (
                    <li key={j} className="course-card__feature">
                      <CheckCircle size={14} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

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
