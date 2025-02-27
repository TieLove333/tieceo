export default function Tasks() {
  return (
    <main className="tasks-page">
      <section className="tasks-header">
        <h1>Project Tasks</h1>
        <p>Track progress across multiple projects</p>
      </section>
      
      <section className="tasks-section tie-tasks">
        <div className="section-header">
          <h2>tie.ceo Tasks</h2>
          <p>Building a transparent founder journey</p>
        </div>
        <div className="tasks-embed">
          <iframe 
            className="clickup-embed" 
            src="https://sharing.clickup.com/1273965/b/h/6-901109632967-2/8ba012e1fcd2031" 
            width="100%" 
            height="700px" 
            style={{ 
              background: 'transparent', 
              border: '1px solid #ccc'
            }}
            title="Tie.ceo Tasks"
          />
        </div>
      </section>
      
      <section className="tasks-section capsole-tasks">
        <div className="section-header">
          <h2>Capsole.io Tasks</h2>
          <p>Building the future - Moonshot platform.</p>
        </div>
        <div className="tasks-embed">
          <iframe 
            src="https://app.clickup.com/9009157067/v/l/li/901100359409" 
            width="100%" 
            height="800px" 
            frameBorder="0"
            title="Capsole.io Tasks"
            style={{ background: 'transparent' }}
          />
        </div>
      </section>
    </main>
  );
} 