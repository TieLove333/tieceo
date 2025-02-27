import Link from 'next/link'
import TieLogo from './TieLogo'

export default function Navigation() {
  return (
    <div className="header-container">
      <nav className="nav-container header">
        <div className="header-content">
          <div className="logo header-logo">
            <Link href="/">
              <TieLogo />
            </Link>
          </div>

          <div className="nav-links">
            <Link href="/updates">Updates</Link>
            <Link href="/revenue">Revenue</Link>
            <Link href="/tasks">Tasks</Link>
            <a 
              href="https://capsole.io" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Capsole
            </a>
            <a 
              href="https://x.com/tielove333" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H1.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zm-1.268 19.54h2.034L5.523 3.285H3.32L17.633 20.693z"/>
              </svg>
            </a>
            <a 
              href="https://x.com/tielove333" 
              className="cta-button"
            >
              Get Updates
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
} 