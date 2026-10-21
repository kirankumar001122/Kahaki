import { Play } from 'lucide-react';
import './VideoSection.css';
import { usePublishedContent } from '../hooks/usePublishedContent';

function getPlayableEmbedUrl(video) {
  if (video.provider === 'youtube') {
    const match = video.embed_url.match(/\/embed\/([\w-]+)/);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1&controls=1`;
    }
  }
  return video.embed_url;
}

export default function VideoSection() {
  const { videos } = usePublishedContent();

  if (videos.length === 0) return null;

  return (
    <section id="videos" className="videos section">
      <div className="container">
        <div className="text-center">
          <p className="section-label">Watch &amp; Learn</p>
          <h2 className="section-title">Khaki Academy Videos</h2>
          <p className="section-subtitle">
            Explore updates, lessons, and learning resources from Khaki Academy.
          </p>
        </div>

        <div className="videos__grid">
          {videos.map((video) => (
            <article className="video-card" key={video.id}>
              <div className="video-card__frame">
                <iframe
                  src={getPlayableEmbedUrl(video)}
                  title={video.title}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                <span className="video-card__badge"><Play size={13} /> Video</span>
              </div>
              <div className="video-card__body">
                <h3>{video.title}</h3>
                {video.description && <p>{video.description}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
