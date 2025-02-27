'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TieLogo from './components/TieLogo';
import Footer from './components/Footer';

// Matrix-like background component
const MatrixBackground = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const generateCharacters = () => {
      const cols = Math.floor(window.innerWidth / 15);
      const newCharacters = Array(cols).fill().map(() => ({
        x: Math.random() * window.innerWidth,
        y: -50,
        speed: Math.random() * 3 + 1,
        char: String.fromCharCode(0x30A0 + Math.random() * 96)
      }));
      setCharacters(newCharacters);
    };

    generateCharacters();
    window.addEventListener('resize', generateCharacters);
    return () => window.removeEventListener('resize', generateCharacters);
  }, []);

  const animateCharacters = () => {
    return characters.map((char, index) => (
      <span 
        key={index} 
        style={{
          position: 'absolute',
          left: char.x,
          top: char.y,
          color: 'rgba(0, 255, 70, 0.3)',
          fontSize: '12px',
          userSelect: 'none',
          pointerEvents: 'none'
        }}
      >
        {char.char}
      </span>
    ));
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    >
      {animateCharacters()}
    </div>
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
      <Footer />
    </div>
  );
} 