export default function Capsole() {
  return (
    <main className="capsole-page">
      <section className="capsole-hero">
        <h1>Capsole.io: The $1B SaaS Vision</h1>
        <p>Building the future of collaborative AI-powered software development</p>
      </section>

      <section className="capsole-features">
        <div className="feature-grid">
          <div className="feature-card">
            <h3>AI-Powered Collaboration</h3>
            <p>Revolutionize how teams build and deploy software</p>
          </div>
          <div className="feature-card">
            <h3>Intelligent Workflows</h3>
            <p>Automate and optimize development processes</p>
          </div>
          <div className="feature-card">
            <h3>Real-Time Insights</h3>
            <p>Gain unprecedented visibility into project dynamics</p>
          </div>
        </div>
      </section>

      <section className="capsole-cta">
        <a 
          href="https://capsole.io" 
          target="_blank" 
          rel="noopener noreferrer"
          className="cta-button"
        >
          Learn More About Capsole
        </a>
      </section>
    </main>
  );
} 