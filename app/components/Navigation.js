import Link from 'next/link'
import TieLogo from './TieLogo'

export default function Navigation() {
  return (
    <nav className="nav-container" style={{ 
      maxWidth: '1400px', 
      margin: '20px 10px 10px', 
      borderRadius: '12px',
      backgroundColor: 'white',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      position: 'sticky', 
      top: 0, 
      zIndex: 100 
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' }}>
        <div className="logo">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TieLogo />
          </Link>
        </div>

        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/updates">Updates</Link>
          <Link href="/revenue">Revenue</Link>
          <Link href="/tasks">Tasks</Link>
          <a 
            href="https://capsole.io" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: '#0070f3', 
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.2s ease'
            }}
          >
            Capsole
          </a>
          <a 
            href="https://x.com/your_handle" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H1.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zm-1.268 19.54h2.034L5.523 3.285H3.32L17.633 20.693z"/>
            </svg>
          </a>
          <a 
            href="https://twitter.com/your_handle" 
            className="cta-button" 
            style={{ background: 'linear-gradient(90deg, #0070f3, #00c6ff)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '50px', fontWeight: '600', textDecoration: 'none', transition: 'all 0.3s ease' }}
          >
            Get Updates
          </a>
        </div>
      </div>
    </nav>
  );
} 