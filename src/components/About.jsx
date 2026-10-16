import { BookOpen, Video, Users, MessageCircle, Globe, Briefcase } from 'lucide-react';
import './About.css';

const PILLARS = [
  { icon: <Video size={22} />, title: 'Live Online Classes', desc: 'Interactive, real-time sessions with expert trainers — no pre-recorded lectures.' },
  { icon: <Users size={22} />, title: 'Small Batches', desc: 'Maximum 8 students per batch so every learner gets personal attention and practice time.' },
  { icon: <MessageCircle size={22} />, title: 'Real Conversation Practice', desc: 'Role plays, group discussions, debate sessions — practice English the way it is actually used.' },
  { icon: <Globe size={22} />, title: 'Flexible Timings', desc: 'Morning, afternoon and evening batches — learn at a time that suits your schedule.' },
  { icon: <Briefcase size={22} />, title: 'Career-Focused', desc: 'Interview preparation, professional communication and workplace English built into every course.' },
  { icon: <BookOpen size={22} />, title: 'Structured Curriculum', desc: 'Level-wise roadmap from basics to advanced — with assessments to track progress.' },
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
                alt="Indian trainer conducting spoken English class online"
                className="about__img"
                loading="lazy"
              />
              <div className="about__img-badge">
                <span className="about__badge-num">10+</span>
                <span className="about__badge-text">Years of<br/>Excellence</span>
              </div>
              <div className="about__img-card">
                <div className="about__img-card-icon">🇮🇳</div>
                <div>
                  <p className="about__img-card-title">Made for India</p>
                  <p className="about__img-card-sub">Training in Hindi & English</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="about__text fade-in-right">
            <p className="section-label">About Khaki Academy</p>
            <h2 className="section-title">We Believe Every Indian Deserves to Speak English with Confidence</h2>
            <div className="divider"></div>
            <p className="about__para">
              Khaki Academy was founded with one powerful mission — to help ordinary Indians
              communicate in English with extraordinary confidence. Whether you are a student
              preparing for campus placements, a working professional eyeing a promotion, or a
              homemaker who wants to help your children with English homework, we have a
              course designed exactly for you.
            </p>
            <p className="about__para">
              Our trainers are not just English teachers — they are communication coaches who
              understand the real barriers Indian learners face: fear of making mistakes, lack of
              practice opportunities, and the gap between textbook English and spoken English.
              We bridge that gap, one conversation at a time.
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
