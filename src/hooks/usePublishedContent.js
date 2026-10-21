import { useEffect, useState } from 'react';

export function usePublishedContent() {
  const [content, setContent] = useState({ sections: [], courses: [], videos: [], testimonials: [] });

  useEffect(() => {
    let active = true;
    fetch('/api/content')
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error('Content unavailable'))))
      .then((json) => {
        if (active && json.ok) setContent({
          sections: Array.isArray(json.sections) ? json.sections : [],
          courses: Array.isArray(json.courses) ? json.courses : [],
          videos: Array.isArray(json.videos) ? json.videos : [],
          testimonials: Array.isArray(json.testimonials) ? json.testimonials : [],
        });
      })
      .catch(() => {
        // The public site keeps its bundled content when CMS content is unavailable.
      });
    return () => { active = false; };
  }, []);

  return content;
}

export function findPublishedSection(sections, pageKey, sectionKey) {
  return sections.find((section) => section.page_key === pageKey && section.section_key === sectionKey) || null;
}
