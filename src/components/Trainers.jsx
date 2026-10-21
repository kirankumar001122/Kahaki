import './Trainers.css';

export default function Trainers() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="trainers" className="trainers section">
      <div className="container">
        <div className="text-center fade-in">
          <p className="section-label">Leadership at Khaki Academy</p>
          <h2 className="section-title">Meet Our Founder</h2>
        </div>

        {/* Founder feature layout */}
        <div className="founder__layout fade-in">
          {/* Left — Photo Card */}
          <div className="founder__card">
            <div className="founder__img-wrap">
              <img
                src="/images/govardhan-krishna.png"
                alt="Govardhan Krishna – Founder & Managing Director, Khaki Academy"
                className="founder__img"
                loading="lazy"
              />
            </div>

          </div>

          {/* Right — Bio */}
          <div className="founder__bio">
            <p className="section-label">Founder &amp; Managing Director</p>
            <h2 className="founder__bio-name">Meet Govardhan Krishna</h2>

            <p className="founder__bio-para">
              Govardhan Krishna is the founder and managing director of Khaki Academy — an Academy of Excellence
              committed to transforming how students learn and grow. With a deep passion for English communication,
              academic coaching, and student empowerment, he established Khaki Academy to bridge the gap between
              classroom learning and real-world application.
            </p>

            <p className="founder__bio-para">
              Under his leadership, Khaki Academy brings together expert academic support, professional spoken
              English training, computer skills, and competitive exam preparation — all under one roof in Malur,
              Karnataka. His vision is to build confident, capable learners ready to lead their futures.
            </p>

            <button
              className="btn btn-primary founder__cta"
              onClick={() => scrollTo('contact')}
            >
              Contact the academy →
            </button>

            <p className="founder__disclaimer">
              *Achievement descriptions reflect the academy's own promotional materials. Supporting certificates
              and record-body details should be displayed if available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
