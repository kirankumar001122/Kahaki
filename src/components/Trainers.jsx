import './Trainers.css';

export default function Trainers() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="trainers" className="trainers section">
      <div className="container">
        <div className="text-center fade-in">
          <p className="section-label">Leadership at Khaki Academy</p>
          <h2 className="section-title">Meet Our Founders</h2>
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

        <div className="founder__layout founder__layout--cofounder fade-in">
          <div className="founder__card">
            <div className="founder__img-wrap">
              <img
                src="/images/vignesh-krishna.png"
                alt="Vignesh Krishna – Co-Founder, Khaki Academy"
                className="founder__img"
                loading="lazy"
              />
            </div>
          </div>

          <div className="founder__bio">
            <p className="section-label">Co-Founder</p>
            <h2 className="founder__bio-name">Vignesh Krishna</h2>
            <p className="founder__bio-organization">KHAKI ACADEMY — ACADEMY OF EXCELLENCE</p>

            <h3 className="founder__bio-heading">Educational Qualification</h3>
            <p className="founder__bio-para">Bachelor of Engineering (B.E.)</p>

            <h3 className="founder__bio-heading">Professional Profile</h3>
            <p className="founder__bio-para">
              Vignesh Krishna is the Co-Founder of KHAKI ACADEMY, contributing to the institution’s vision of
              delivering quality education, practical learning, and professional development. With an engineering
              background, he shares the founding team’s commitment to building an institution that empowers learners
              through knowledge, skills, and educational opportunities.
            </p>
            <p className="founder__bio-para">
              His role reflects a shared ambition to support institutional growth, encourage skill-based learning,
              and contribute to the long-term development of KHAKI ACADEMY.
            </p>

            <h3 className="founder__bio-heading">Focus Areas</h3>
            <ul className="founder__focus-list">
              <li>Institutional Growth and Development</li>
              <li>Educational Excellence</li>
              <li>Practical and Skill-Oriented Learning</li>
              <li>Professional Development</li>
              <li>Long-Term Institutional Vision</li>
            </ul>
          </div>
        </div>

        <div className="founder__vision fade-in">
          <p className="section-label">Our Shared Vision</p>
          <h2 className="founder__bio-name">Building Confident, Capable Learners</h2>
          <p className="founder__bio-para">
            At KHAKI ACADEMY, our founders are committed to building a trusted institution that combines academic
            excellence with practical skills and professional development.
          </p>
          <p className="founder__bio-para">
            Our educational programmes include academic coaching, Professional Spoken English, computer education,
            communication skills, and career-oriented training.
          </p>
          <p className="founder__bio-para">
            Our mission is to empower every learner with knowledge, confidence, communication skills, and the
            practical abilities needed to succeed in education, careers, and life.
          </p>
        </div>
      </div>
    </section>
  );
}
