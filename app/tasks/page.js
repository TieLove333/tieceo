export default function Tasks() {
  return (
    <main className="tasks-page">
      <section className="tasks-header">
        <h1>Project Tasks</h1>
        <p>Real-time task tracking for tie.ceo</p>
      </section>

      <section className="tasks-embed">
        <iframe 
          className="clickup-embed" 
          src="https://sharing.clickup.com/1273965/b/h/6-901109632967-2/8ba012e1fcd2031" 
          width="100%" 
          height="700px" 
          style={{ 
            background: 'transparent', 
            border: '1px solid #ccc',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}
        />
      </section>
    </main>
  );
} 