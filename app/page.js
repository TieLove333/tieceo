export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <h1 className="hero-title">
          Building a $1B SaaS Company
          <span className="hero-subtitle">with AI as a Solo Founder</span>
        </h1>
        
        <p className="hero-description">
          Follow my journey building in public. Live revenue, daily updates, and complete transparency
          as I leverage AI to scale from $0 to $1B.
        </p>

        <div>
          <a href="#updates" className="cta-button">
            View Progress
          </a>
          <a href="#revenue" style={{ marginLeft: '1rem', fontWeight: '600', color: '#111827' }}>
            Live Revenue <span>→</span>
          </a>
        </div>
      </section>

      <div className="feature-cards">
        <div className="feature-card">
          <h3 className="feature-title">Daily Updates</h3>
          <p className="feature-description">
            Follow my builder journey with daily logs and technical deep-dives.
          </p>
        </div>
        
        <div className="feature-card">
          <h3 className="feature-title">Live Revenue</h3>
          <p className="feature-description">
            Watch the revenue grow in real-time with Stripe integration.
          </p>
        </div>
        
        <div className="feature-card">
          <h3 className="feature-title">AI-Powered</h3>
          <p className="feature-description">
            See how I&apos;m using AI to build and scale faster than ever.
          </p>
        </div>
      </div>
    </main>
  );
} 