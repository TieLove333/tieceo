import Link from 'next/link'
import TieLogo from './TieLogo'

export default function Navigation() {
  return (
    <nav className="nav-container" style={{ maxWidth: '1400px', margin: '0 auto', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' }}>
        <div className="logo">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TieLogo />
            <span>tie.ceo</span>
          </Link>
        </div>

        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/updates">Updates</Link>
          <Link href="/revenue">Revenue</Link>
          <a 
            href="https://twitter.com/your_handle" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Twitter
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