import {
  Target, Zap, Heart, TrendingUp, ShieldCheck,
  BookOpen, Monitor, Users
} from 'lucide-react';
import './WhyUs.css';

const REASONS = [
  {
    icon: <Target size={24} />,
    title: 'Structured Learning',
    desc: 'Every programme follows a clear, structured curriculum — from school tuition to PUC coaching and competitive exam foundations — so students always know what to expect.',
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Expert Faculty Guidance',
    desc: 'Experienced, subject-specialist faculty provide clear explanations and dedicated support for every student at every level.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Practical Teaching Methods',
    desc: 'We combine traditional academic rigor with modern AI-based learning tools and smart classroom technology for effective, practical teaching.',
  },
  {
    icon: <Monitor size={24} />,
    title: 'Smart Classrooms — Wi-Fi & AC',
    desc: 'Fully equipped smart classrooms with free Wi-Fi and air conditioning provide a comfortable, focused study environment for all students.',
  },
  {
    icon: <Users size={24} />,
    title: 'Personalised — Limited Batches',
    desc: 'Small, limited-size batches ensure every student receives individual attention, timely feedback, and personalised support where needed.',
  },
  {
    icon: <BookOpen size={24} />,
    title: 'Comprehensive Study Materials',
    desc: 'Structured, exam-oriented study materials covering all subjects to support thorough academic preparation at every level.',
  },
  {
    icon: <Heart size={24} />,
    title: 'Regular Mock Tests',
    desc: 'Frequent mock tests and practice sessions build examination confidence and help students identify areas for improvement.',
  },
  {
    icon: <TrendingUp size={24} />,
    title: 'Measurable Progress Tracking',
    desc: 'Systematic monitoring of each student\'s academic progress ensures consistent, measurable improvement throughout the course.',
  },
];

const HIGHLIGHTS = [
  { num: 'School',   label: 'Tuition Classes' },
  { num: 'PUC',      label: 'Science & Commerce' },
  { num: 'English',  label: 'Spoken English' },
  { num: 'Computer', label: 'Training' },
  { num: 'CET/NEET', label: 'JEE Foundation' },
  { num: 'Career',   label: 'Professional Skills' },
];

export default function WhyUs() {
  return (
    <section id="why" className="why section">
      <div className="container">
        <div className="text-center fade-in">
          <p className="section-label">Why Choose Us</p>
          <h2 className="section-title">Why Students Choose Khaki Academy</h2>
          <p className="section-subtitle">
            Structured learning, practical teaching, personalised support, and measurable
            progress — a complete academic environment for every kind of learner.
          </p>
        </div>

        {/* Reasons grid */}
        <div className="why__grid">
          {REASONS.map((r, i) => (
            <div
              key={i}
              className="why__card fade-in"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <span className="why__card-icon">{r.icon}</span>
              <h3 className="why__card-title">{r.title}</h3>
              <p className="why__card-desc">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Highlights banner */}
        <div className="why__stats fade-in">
          {HIGHLIGHTS.map((n, i) => (
            <div key={i} className="why__stat">
              <span className="why__stat-num">{n.num}</span>
              <span className="why__stat-label">{n.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
