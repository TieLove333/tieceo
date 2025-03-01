'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import TieLogo from './components/TieLogo';

// Matrix-like background component
const MatrixBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    
    // Characters to display
    const chars = "01000010 00000000 01110101 00000000 01101001 00000000 01101100 00000000 01100100 00000000 00100000 00000000 01100110 00000000 01101111 00000000 01110010 00000000 01100101 00000000 01110110 00000000 01100101 00000000 01110010 00000000 00100000 00000000 01100010 00000000 01110101 00000000 01101001 00000000 01101100 00000000 01100100 00000000 00100000 00000000";
    
    function draw() {
      // Semi-transparent slate-50 to create fade effect
      ctx.fillStyle = 'rgba(248, 250, 252, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(203, 213, 225, 0.3)';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // x = i * fontSize, y = drops[i] * fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Randomly reset the drop position to top
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move drops down
        drops[i]++;
      }
    }
    
    const interval = setInterval(draw, 33);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

// Livestream component
const Livestream = () => {
  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.charset = 'utf-8';
    script.async = true;
    document.body.appendChild(script);
    
    // Force Twitter widgets to load
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    }
    
    return () => {
      // Clean up
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="twitter-embed-container">
      <blockquote className="twitter-tweet" data-media-max-width="560">
        <p lang="en" dir="ltr">Building in public live stream day 3 :) <a href="https://t.co/QZ8UuJ884d">https://t.co/QZ8UuJ884d</a></p>
        &mdash; Tie Love (@tielove333) <a href="https://twitter.com/tielove333/status/1895601744119230908?ref_src=twsrc%5Etfw">February 28, 2025</a>
      </blockquote>
    </div>
  );
};

export default function Home() {
  const sections = [
    {
      title: 'Updates',
      description: 'Stay informed about the latest progress and developments.',
      link: '/updates'
    },
    {
      title: 'Revenue Tracker',
      description: 'Monitor financial goals and track business performance.',
      link: '/revenue'
    },
    {
      title: 'Tasks',
      description: 'Track ongoing projects and upcoming milestones.',
      link: '/tasks'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <MatrixBackground />
      
      {/* Headline section */}
      <div className="container flex flex-col items-center justify-center text-center mb-8">
        <h1 className="hero-title mb-4 w-full text-center">
          Building A Solo $1B SAAS
        </h1>
        <p className="hero-description mb-8 w-full text-center">
          Building it in public and sharing it all here.
        </p>
      </div>
      
      {/* Livestream section */}
      <div className="container flex flex-col items-center justify-center pt-8">
        <h2 className="text-2xl font-bold mb-4 w-full text-center livestream-header">🔴 Watch Tie's Livestream</h2>
        <Livestream />
      </div>
      
      <main className="container py-16 flex flex-col items-center justify-center">
        <div className="feature-cards w-full">
          {sections.map((section) => (
            <div key={section.title} className="feature-card">
              <h2 className="feature-title">{section.title}</h2>
              <p className="feature-description">{section.description}</p>
              <div className="mt-6">
                <Link href={section.link} className="cta-button">
                  View {section.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 