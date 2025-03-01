'use client';

import { useEffect, useRef } from 'react';

export default function TwitterEmbed({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    document.body.appendChild(script);

    // Initialize Twitter widgets
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load(containerRef.current);
    } else {
      script.onload = () => {
        if (window.twttr && window.twttr.widgets) {
          window.twttr.widgets.load(containerRef.current);
        }
      };
    }

    return () => {
      // Clean up script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
} 