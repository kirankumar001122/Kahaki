import './Trainers.css';

export default function Trainers() {
  return (
    <section id="trainers" className="trainers section">
      <div className="container">
        <div className="text-center fade-in">
          <p className="section-label">Academy of Excellence</p>
          <h2 className="section-title">FOUNDERS OF KHAKI ACADEMY</h2>
          <p className="section-subtitle">Building a Foundation for Excellence</p>
        </div>

        {/* Founder feature layout */}
        <div className="founder__layout fade-in">
          {/* Left — Photo Card */}
          <div className="founder__card photo-frame">
            <div className="founder__img-wrap photo-frame__media">
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
            <p className="section-label">Founder 1 · Founder &amp; Director</p>
            <h2 className="founder__bio-name">GOVARDHAN KRISHNA</h2>

            <p className="founder__bio-para">
              Khaki Academy was founded by Govardhan Krishna and Vignesh Krishna with a shared vision of providing
              quality education, professional training and practical skill development.
            </p>

            <p className="founder__bio-para">
              Govardhan Krishna is an educator, entrepreneur and Resource Person in English Accents and Communication
              Skills. He helps learners strengthen their English language proficiency, communication abilities and
              professional confidence.
            </p>

            <p className="founder__bio-para">
              He is recognised for his work in English grammar and his reported world-record achievements, including
              writing 7,000 English grammar formulae in 4 hours, 55 minutes and 2 seconds.
            </p>

            <h3 className="founder__bio-heading">Educational Qualifications</h3>
            <ul className="founder__focus-list">
              <li>Master of Business Administration (MBA) — Finance</li>
              <li>Master of Commerce (M.Com)</li>
            </ul>

            <h3 className="founder__bio-heading">Areas of Expertise</h3>
            <ul className="founder__focus-list">
              <li>English accents and pronunciation</li>
              <li>Spoken English and communication skills</li>
              <li>English grammar and sentence formation</li>
              <li>Professional and workplace communication</li>
              <li>Curriculum planning and educational leadership</li>
              <li>Academic and professional skill development</li>
            </ul>

            <h3 className="founder__bio-heading">Vision</h3>
            <p className="founder__bio-para">
              To empower students and professionals with knowledge, effective communication, confidence and
              practical skills for lifelong growth.
            </p>
          </div>
        </div>

        <div className="founder__layout founder__layout--cofounder fade-in">
          <div className="founder__card photo-frame">
            <div className="founder__img-wrap photo-frame__media">
              <img
                src="/images/vignesh-krishna.png"
                alt="Vignesh Krishna – Co-Founder, Khaki Academy"
                className="founder__img"
                loading="lazy"
              />
            </div>
          </div>

          <div className="founder__bio">
            <p className="section-label">Founder 2 · Co-Founder</p>
            <h2 className="founder__bio-name">VIGNESH KRISHNA</h2>
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
