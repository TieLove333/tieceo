import Link from 'next/link'
import TieLogo from './TieLogo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <TieLogo width={24} height={24} />
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} TIE Project. All rights reserved.
        </div>
        <div className="footer-admin-link">
          <Link href="https://x.com/tielove333" target="_blank" rel="noopener noreferrer">
            Follow on X
          </Link>
          <span className="mx-2">|</span>
          <Link href="/admin">Admin</Link>
        </div>
      </div>
    </footer>
  );
} 