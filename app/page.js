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
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    
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
      link: '/updates',
      icon: '📝'
    },
    {
      title: 'Tasks',
      description: 'Track ongoing projects and upcoming milestones.',
      link: '/tasks',
      icon: '✅'
    },
    {
      title: 'Admin',
      description: 'Manage and publish site content.',
      link: '/admin',
      icon: '🔐'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <MatrixBackground />
      <main className="flex-grow container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          <TieLogo className="mx-auto mb-6 w-32 h-32" />
          <h1 className="text-5xl font-bold mb-4 text-primary-foreground">
            TIE Project Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive platform for tracking progress, managing tasks, 
            and sharing updates on our innovative technology initiatives.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section) => (
            <Link 
              key={section.title} 
              href={section.link}
              className="block transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="bg-card p-6 rounded-xl shadow-md text-center hover:bg-accent/10 border border-border">
                <div className="text-6xl mb-4">{section.icon}</div>
                <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
                <p className="text-muted-foreground">{section.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
} 