import { ArrowRight, CheckCircle, Laptop, MessageCircle, Video } from 'lucide-react';
import './OnlineClasses.css';

const ONLINE_FEATURES = [
  'Live, interactive classes from the comfort of home',
  'Recorded revision support and structured study material',
  'Practical speaking, doubt-solving and feedback sessions',
  'Flexible learning for students and working professionals',
];

export default function OnlineClasses() {
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="online-classes" className="online-classes section">
      <div className="container">
        <div className="online-classes__layout">
          <div className="online-classes__content fade-in-left">
            <p className="section-label">Learn From Anywhere</p>
            <h2 className="section-title">Online Classes at Khaki Academy</h2>
            <p className="online-classes__intro">
              Access expert guidance, practical activities and personal support through engaging
              online learning designed for today&apos;s students and professionals.
            </p>

            <div className="online-classes__features">
              {ONLINE_FEATURES.map((feature) => (
                <div className="online-classes__feature" key={feature}>
                  <CheckCircle size={18} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="online-classes__actions">
              <button type="button" className="btn btn-primary" onClick={scrollToContact}>
                Enquire About Online Classes <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="online-classes__visual fade-in-right">
            <div className="online-classes__image-card">
              <img src="/images/image1.jpg" alt="Online learning at Khaki Academy" loading="lazy" />
              <div className="online-classes__badge">
                <Video size={18} />
                <span>Live &amp; Interactive</span>
              </div>
            </div>
            <div className="online-classes__quick-links">
              <div><Laptop size={18} /><span>Learn online</span></div>
              <div><MessageCircle size={18} /><span>Ask questions</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
