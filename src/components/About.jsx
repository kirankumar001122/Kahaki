import {
  BookOpen, Monitor, Users, ClipboardCheck,
  TrendingUp, Brain, Globe, Briefcase, GraduationCap, Star
} from 'lucide-react';
import './About.css';

const PILLARS = [
  {
    icon: <BookOpen size={22} />,
    title: 'Expert Faculty Guidance',
    desc: 'Experienced subject specialists dedicated to building strong academic foundations for every student.',
  },
  {
    icon: <Users size={22} />,
    title: 'Personalised Learning',
    desc: 'Limited batch sizes ensure each student receives individual attention and personalised guidance.',
  },
  {
    icon: <Brain size={22} />,
    title: 'AI-Based Learning Tools',
    desc: 'Modern AI-powered tools support in-depth subject understanding and effective learning.',
  },
  {
    icon: <Monitor size={22} />,
    title: 'Smart Classrooms',
    desc: 'Fully equipped smart classrooms with free Wi-Fi and AC for a focused learning environment.',
  },
  {
    icon: <ClipboardCheck size={22} />,
    title: 'Mock Tests & Study Materials',
    desc: 'Regular mock tests and comprehensive study materials to prepare students for examinations.',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Progress Tracking',
    desc: 'Systematic monitoring of each student\'s progress to ensure consistent academic improvement.',
  },
];

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about__grid">
          {/* Image side */}
          <div className="about__visual fade-in-left">
            <div className="about__img-wrap">
              <img
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=580&q=85&auto=format&fit=crop"
                alt="Students learning at Khaki Academy Malur"
                className="about__img"
                loading="lazy"
              />
              <div className="about__img-badge">
                <span className="about__badge-num">PUC</span>
                <span className="about__badge-text">Science &amp;<br />Commerce</span>
              </div>
              <div className="about__img-card">
                <div className="about__img-card-icon">🎯</div>
                <div>
                  <p className="about__img-card-title">CET / NEET / JEE</p>
                  <p className="about__img-card-sub">Foundation Courses</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="about__text fade-in-right">
            <p className="section-label">About Khaki Academy · Academy of Excellence</p>
            <h2 className="section-title">Learn Today. Lead Tomorrow.</h2>
            <div className="divider"></div>

            <p className="about__para">
              Khaki Academy is an Academy of Excellence based in Malur, Karnataka, committed to
              empowering students and professionals through quality education, effective
              communication, and practical skills. We serve school students, PUC students,
              English learners, working professionals, and parents who want the best for their
              children.
            </p>

            <p className="about__para">
              Founded by <strong>Govardhan Krishna</strong>, Khaki Academy combines expert
              academic coaching for 1st and 2nd PUC Science and Commerce with foundation
              preparation for CET, NEET and JEE, professional Spoken English training, computer
              skills, and career development programmes — all under one roof in Malur.
            </p>

            <p className="about__para">
              Our mission is to provide structured academic support, practical teaching, and
              measurable progress to every student. Our vision is a community where every
              learner has access to quality education, expert guidance, and the confidence to
              lead their future.
            </p>

            <div className="about__pillars">
              {PILLARS.map((p, i) => (
                <div key={i} className="about__pillar fade-in" style={{ transitionDelay: `${i * 0.07}s` }}>
                  <span className="about__pillar-icon">{p.icon}</span>
                  <div>
                    <p className="about__pillar-title">{p.title}</p>
                    <p className="about__pillar-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
