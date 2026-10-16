import { Target, Zap, Heart, TrendingUp, ShieldCheck, Phone } from 'lucide-react';
import './WhyUs.css';

const REASONS = [
  {
    icon: <Target size={24} />,
    title: 'Outcome-Focused Training',
    desc: 'Every class has a clear goal — a skill you can use immediately in real conversations, not just textbook exercises.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Learn Faster with Immersion',
    desc: 'Immersive conversation-first approach means you speak from day one — not after months of grammar drills.',
  },
  {
    icon: <Heart size={24} />,
    title: 'Judgment-Free Environment',
    desc: 'Our safe, supportive classroom culture encourages you to make mistakes, learn from them, and grow confidently.',
  },
  {
    icon: <TrendingUp size={24} />,
    title: 'Visible Progress Guaranteed',
    desc: 'Structured curriculum with regular assessments ensures you track improvement at every stage of the course.',
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Qualified Expert Trainers',
    desc: 'All trainers hold recognized certifications in English language teaching and have 5+ years of training experience.',
  },
  {
    icon: <Phone size={24} />,
    title: 'WhatsApp Practice Community',
    desc: 'Daily speaking prompts, vocabulary challenges, and peer practice on a dedicated students\' WhatsApp group.',
  },
];

const NUMBERS = [
  { num: '5,000+', label: 'Students Trained' },
  { num: '98%',    label: 'Satisfaction Rate' },
  { num: '8+',     label: 'Expert Trainers' },
  { num: '15+',    label: 'Courses Offered' },
  { num: '4.9★',   label: 'Average Rating' },
  { num: '3+',     label: 'States Reached' },
];

export default function WhyUs() {
  return (
    <section id="why" className="why section">
      <div className="container">
        <div className="text-center fade-in">
          <p className="section-label">Why Choose Us</p>
          <h2 className="section-title">Why Thousands Trust Khaki Academy</h2>
          <p className="section-subtitle">
            We do not just teach English — we transform how you think, speak, and carry
            yourself in every situation.
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

        {/* Stats banner */}
        <div className="why__stats fade-in">
          {NUMBERS.map((n, i) => (
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
