import Link from 'next/link'
import TieLogo from './TieLogo'

export default function Navigation() {
  return (
    <div className="header-container">
      <header className="header">
        <div className="header-content">
          <div className="header-logo">
            <img src="/t-logo.png" alt="T Logo" />
          </div>
        </div>
      </header>
    </div>
  );
} 