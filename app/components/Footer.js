import TieLogo from './TieLogo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <TieLogo />
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} Tie.ceo
        </div>
      </div>
    </footer>
  );
} 