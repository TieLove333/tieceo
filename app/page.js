'use client';

import { useEffect, useRef } from 'react';
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
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(248, 250, 252, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(0, 255, 70, 0.3)';
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
      <main className="flex-grow container mx-auto px-4 py-16 relative z-10">
        <div className="text-center min-h-[60vh] flex flex-col justify-center items-center">
          <TieLogo className="mx-auto mb-12 w-32 h-32" />
          <h1 className="hero-title mb-8">
            Building A Solo $1B SAAS
          </h1>
          <p className="hero-description mb-16">
            Building it in public and sharing it all here.
          </p>
        </div>

        <div className="feature-cards">
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