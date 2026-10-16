import { Quote } from 'lucide-react';
import './Testimonials.css';

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <div className="text-center fade-in">
          <p className="section-label">Student Achievements</p>
          <h2 className="section-title">Student Achievements & Testimonials</h2>
          <p className="section-subtitle">
            Genuine feedback, achievements, and success stories from students and parents who
            have experienced Khaki Academy's coaching and academic support.
          </p>
        </div>

        {/* Placeholder — awaiting verified testimonials and achievements from the academy */}
        <div className="testimonials__placeholder-box fade-in">
          <Quote size={36} style={{ color: 'var(--gold)', opacity: 0.4, margin: '0 auto 1rem' }} />
          <h3>Student Stories Coming Soon</h3>
          <p>
            This section will display genuine student achievements, results, and parent feedback
            from Khaki Academy. If you are a student or parent and would like to share your
            experience, please contact us at <strong>7338308071</strong>.
          </p>
          <p className="testimonials__placeholder-note">
            📝 Academy: Please provide verified student testimonials and achievement records
            (with student/parent permission) to display here before the website goes live.
          </p>
        </div>
      </div>
    </section>
  );
}
