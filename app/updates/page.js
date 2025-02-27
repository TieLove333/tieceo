import { updates } from './updates';

export default function Updates() {
  return (
    <main className="updates-page">
      <section className="updates-header">
        <h1>Building in Public</h1>
        <p>Follow my journey from $0 to $1B with complete transparency</p>
      </section>

      <section className="updates-filters">
        <div className="tag-filters">
          {Array.from(new Set(updates.flatMap(update => update.tags))).map(tag => (
            <button key={tag} className="tag-filter">{tag}</button>
          ))}
        </div>
      </section>

      <section className="updates-list">
        {updates.map((update, index) => (
          <div key={index} className="update-card">
            <div className="update-header">
              <div className="update-date">{update.date}</div>
              <div className="update-tags">
                {update.tags.map(tag => (
                  <span key={tag} className="update-tag">{tag}</span>
                ))}
              </div>
            </div>
            <h2 className="update-title">{update.title}</h2>
            <p className="update-content">{update.content}</p>
          </div>
        ))}
      </section>
    </main>
  );
} 