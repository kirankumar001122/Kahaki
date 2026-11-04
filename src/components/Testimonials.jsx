import { useState } from 'react';
import { ChevronDown, ExternalLink, Quote, Star } from 'lucide-react';
import './Testimonials.css';
import { usePublishedContent } from '../hooks/usePublishedContent';

const GOOGLE_LISTING_URL = 'https://maps.app.goo.gl/3FeizTNvzi8PYoSr9';
const MAX_REVIEWS = 4;

const SUPPLIED_REVIEWS = [
  ['Preethi Elumalai Arun', 'The computer class was very useful. I learned basic to advanced computer skills in an easy way. The teaching was clear and understandable. 👌 Thank you mam 😊', 'Computer training'],
  ['Santhosh', 'I have completed my Tally course at Khaki Academy. The teaching was very clear and easy to understand. Trainers provided good practical knowledge on accounting and GST.', 'Tally'],
  ['Priya 54', 'Excellent training for computer training. I have completed basics of computer (CCA). I got more knowledge about computer and the teaching was very good.', 'Basic Computer / CCA'],
  ['Sandhya C.N', "Very friendly classes I never saw anywhere else. Ma'am understands my busy schedules and supports me in each class ☺️", 'Computer training'],
].map(([reviewer_name, review_text, course_label], display_order) => ({
  id: `supplied-${display_order}`,
  reviewer_name,
  review_text,
  course_label,
  rating: 5,
  google_url: GOOGLE_LISTING_URL,
  display_order,
}));

function getInitials(name = '') {
  return name
    .split(/\s+/)
    .filter((part) => /^[a-z]/i.test(part))
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.review_text.length > 190;
  const text = !expanded && isLong ? `${review.review_text.slice(0, 190).trim()}…` : review.review_text;

  return (
    <article className="review-card">
      <div className="review-card__top">
        <span className="review-card__avatar" aria-hidden="true">{getInitials(review.reviewer_name)}</span>
        <div className="review-card__identity">
          <h3>{review.reviewer_name}</h3>
          {review.course_label && <span className="review-card__course">{review.course_label}</span>}
        </div>
        <Quote size={22} aria-hidden="true" />
      </div>
      <div className="review-card__stars" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} size={15} fill={index < review.rating ? 'currentColor' : 'none'} />
        ))}
      </div>
      <p className="review-card__text">“{text}”</p>
      {isLong && (
        <button type="button" className="review-card__toggle" onClick={() => setExpanded((value) => !value)}>
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
      <div className="review-card__footer">
        <span><span className="review-card__google-mark">G</span> Google review</span>
        <a href={review.google_url || GOOGLE_LISTING_URL} target="_blank" rel="noopener noreferrer">
          Read on Google <ExternalLink size={13} />
        </a>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const [expanded, setExpanded] = useState(false);
  const { testimonials } = usePublishedContent();
  const reviews = (testimonials.length > 0 ? testimonials : SUPPLIED_REVIEWS).slice(0, MAX_REVIEWS);

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <div className="text-center">
          <p className="section-label">Student Feedback</p>
          <h2 className="section-title">Student Achievements &amp; Testimonials</h2>
          <p className="section-subtitle">
            Read feedback from learners who have experienced Khaki Academy&apos;s coaching and practical training.
          </p>
        </div>

        <div className={`testimonials__accordion ${expanded ? 'is-expanded' : ''}`}>
          <button
            type="button"
            className="testimonials__trigger"
            aria-expanded={expanded}
            aria-controls="testimonials-reviews"
            onClick={() => setExpanded((isOpen) => !isOpen)}
          >
            <span>
              <span className="testimonials__trigger-label">What Our Students Say</span>
              <span className="testimonials__trigger-hint">
                {expanded ? 'Hide student reviews' : `Read ${reviews.length} student reviews`}
                <span className="testimonials__trigger-stars" aria-hidden="true">★★★★★</span>
              </span>
            </span>
            <ChevronDown size={22} aria-hidden="true" />
          </button>
          <div
            id="testimonials-reviews"
            className="testimonials__content"
            role="region"
            aria-label="Student reviews"
            aria-hidden={!expanded}
          >
            <div className="testimonials__inner">
              <div className="testimonials__grid">
                {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
              </div>

              <div className="testimonials__actions">
                <a className="btn btn-primary btn-lg" href={GOOGLE_LISTING_URL} target="_blank" rel="noopener noreferrer">
                  Read All Google Reviews <ExternalLink size={17} />
                </a>
                <p>Feedback reproduced from reviews supplied for Khaki Academy. Ratings shown are based on the supplied review information and are not independently verified by this website.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
