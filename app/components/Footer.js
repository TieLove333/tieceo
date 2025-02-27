import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <Image 
            src="/t-logo.png" 
            alt="T Logo" 
            width={30} 
            height={30}
          />
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} Tie.ceo
        </div>
      </div>
    </footer>
  );
} 