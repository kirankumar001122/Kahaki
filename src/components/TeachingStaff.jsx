import { useState } from 'react';
import { ChevronDown, GraduationCap, ListChecks, Sparkles } from 'lucide-react';
import { DEFAULT_TEACHING_STAFF } from '../data/teachingStaff';
import { usePublishedContent } from '../hooks/usePublishedContent';
import './TeachingStaff.css';

function FacultyProfile({ faculty }) {
  return (
    <article className="staff-profile">
      <div className="staff-profile__identity">
        <div className="staff-profile__portrait">
          <img src={faculty.photograph} alt={`${faculty.full_name} portrait`} loading="lazy" />
        </div>
        <div className="staff-profile__identity-copy">
          <p className="staff-profile__eyebrow">Teaching Faculty</p>
          <h3>{faculty.full_name}</h3>
          <p className="staff-profile__designation">{faculty.designation}</p>
          <p className="staff-profile__institution">{faculty.institution}</p>
        </div>
        <div className="staff-profile__experience" aria-label={`${faculty.experience_years} years of teaching experience`}>
          <strong>{faculty.experience_years}</strong>
          <span>Years of<br />Teaching Experience</span>
        </div>
      </div>

      <div className="staff-profile__details">
        <div className="staff-profile__detail-grid">
          <section>
            <h4><GraduationCap size={18} /> Educational Qualifications</h4>
            <ul className="staff-profile__list">
              {faculty.qualifications.map((qualification) => <li key={qualification}>{qualification}</li>)}
            </ul>
          </section>
          <section>
            <h4><ListChecks size={18} /> Subject Specialisations</h4>
            <ul className="staff-profile__list">
              {faculty.specialisations.map((specialisation) => <li key={specialisation}>{specialisation}</li>)}
            </ul>
          </section>
        </div>

        <section className="staff-profile__copy">
          <h4><Sparkles size={18} /> Professional Profile</h4>
          <p>{faculty.professional_profile}</p>
          <h4>Teaching Approach</h4>
          <p>{faculty.teaching_methodology}</p>
          {faculty.additional_achievements && <p>{faculty.additional_achievements}</p>}
        </section>
      </div>
    </article>
  );
}

export default function TeachingStaff() {
  const [expanded, setExpanded] = useState(false);
  const { faculty } = usePublishedContent();
  const staff = faculty.length > 0 ? faculty : DEFAULT_TEACHING_STAFF;

  return (
    <section id="teaching-staff" className="teaching-staff section">
      <div className="container">
        <div className="teaching-staff__intro fade-in">
          <p className="section-label">Our Educators</p>
          <h2 className="section-title">Our Teaching Staff</h2>
          <p>Meet our experienced and dedicated educators committed to guiding students towards academic excellence.</p>
        </div>

        <div className={`teaching-staff__accordion ${expanded ? 'is-expanded' : ''}`}>
          <button
            type="button"
            className="teaching-staff__trigger"
            aria-expanded={expanded}
            aria-controls="teaching-staff-profiles"
            onClick={() => setExpanded((isOpen) => !isOpen)}
          >
            <span>
              <span className="teaching-staff__trigger-label">Meet Our Teaching Staff</span>
              <span className="teaching-staff__trigger-hint">{expanded ? 'Hide faculty profiles' : 'Explore faculty profiles'}</span>
            </span>
            <ChevronDown size={22} aria-hidden="true" />
          </button>
          <div
            id="teaching-staff-profiles"
            className="teaching-staff__content"
            role="region"
            aria-label="Teaching staff profiles"
            aria-hidden={!expanded}
          >
            <div className="teaching-staff__profiles">
              {staff.map((member) => <FacultyProfile key={member.id || member.full_name} faculty={member} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
