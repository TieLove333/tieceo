import Link from 'next/link'
import TieLogo from './TieLogo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <TieLogo />
        </div>
        
        <div className="footer-links">
          <div className="footer-section">
            <h4>Pages</h4>
            <Link href="/">Home</Link>
            <Link href="/updates">Updates</Link>
            <Link href="/revenue">Revenue</Link>
            <Link href="/tasks">Tasks</Link>
          </div>
          
          <div className="footer-section">
            <h4>Connect</h4>
            <a href="https://x.com/your_handle" target="_blank" rel="noopener noreferrer">X</a>
            <a href="mailto:contact@tie.ceo">Email</a>
          </div>
          
          <div className="footer-section">
            <h4>Projects</h4>
            <a href="https://capsole.io" target="_blank" rel="noopener noreferrer">Capsole.io</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
} 