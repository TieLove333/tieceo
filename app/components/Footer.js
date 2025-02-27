import TieLogo from './TieLogo'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <TieLogo />
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} Tie.ceo
          <span className="footer-admin-link">
            <Link href="/admin">Admin</Link>
          </span>
        </div>
      </div>
    </footer>
  );
} 