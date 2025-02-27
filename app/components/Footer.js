export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <span>tie.ceo</span>
          <p>Building a $1B SaaS with AI</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-section">
            <h4>Pages</h4>
            <a href="/">Home</a>
            <a href="/updates">Updates</a>
            <a href="/revenue">Revenue</a>
          </div>
          
          <div className="footer-section">
            <h4>Connect</h4>
            <a href="https://twitter.com/your_handle" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="mailto:contact@tie.ceo">Email</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} tie.ceo. All rights reserved.</p>
      </div>
    </footer>
  );
} 