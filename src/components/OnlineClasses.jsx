import { CheckCircle, Laptop, MessageCircle, Video } from 'lucide-react';
import './OnlineClasses.css';

const ONLINE_FEATURES = [
  'Live, interactive classes from the comfort of home',
  'Recorded revision support and structured study material',
  'Practical speaking, doubt-solving and feedback sessions',
  'Flexible learning for students and working professionals',
];

const ONLINE_CLASS_IMAGES = [
  {
    src: '/images/online-class-learn-live.jpg',
    alt: 'Khaki Academy online class session',
    title: 'Learn Live',
    text: 'Join focused online sessions with expert guidance.',
  },
  {
    src: '/images/online-class-practise.jpg',
    alt: 'Khaki Academy online learning activity',
    title: 'Practise With Purpose',
    text: 'Build confidence through practical activities and feedback.',
  },
  {
    src: '/images/online-class-stay-connected.jpg',
    alt: 'Khaki Academy student support session',
    title: 'Stay Connected',
    text: 'Ask questions, revise regularly and keep progressing.',
  },
];

export default function OnlineClasses() {
  return (
    <section id="online-classes" className="online-classes section">
      <div className="container">
        <div className="online-classes__layout">
          <div className="online-classes__content fade-in-left">
            <p className="section-label">Learn From Anywhere</p>
            <h2 className="section-title">Professional Spoken English – Online</h2>
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

            <p className="online-classes__note">
              Learn at your own pace with reliable guidance, regular practice and a supportive
              online classroom experience.
            </p>
          </div>

          <div className="online-classes__visual fade-in-right">
            <div className="online-classes__image-grid">
              {ONLINE_CLASS_IMAGES.map((image) => (
                <article className="online-classes__image-card" key={image.src}>
                  <div className="online-classes__image-frame">
                    <img src={image.src} alt={image.alt} loading="lazy" />
                  </div>
                  <div className="online-classes__image-copy">
                    <div className="online-classes__badge">
                      <Video size={16} />
                      <span>{image.title}</span>
                    </div>
                    <p>{image.text}</p>
                  </div>
                </article>
              ))}
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
