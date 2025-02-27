import Link from 'next/link'
import TieLogo from './TieLogo'

export default function Navigation() {
  return (
    <nav className="nav-container">
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TieLogo />
            <span>tie.ceo</span>
          </Link>
        </div>

        <div className="nav-links">
          <Link href="/updates">Updates</Link>
          <Link href="/revenue">Revenue</Link>
          <a 
            href="https://twitter.com/your_handle" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
      </div>
    </nav>
  );
} 