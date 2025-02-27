'use client';

import { useState, useEffect } from 'react';

export default function UpdatesList() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUpdates() {
      try {
        const response = await fetch('/api/updates/route');
        
        if (response.ok) {
          const data = await response.json();
          setUpdates(data);
        }
      } catch (error) {
        console.error('Error fetching updates:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUpdates();
  }, []);
  
  if (loading) {
    return <div className="loading">Loading updates...</div>;
  }
  
  if (updates.length === 0) {
    return (
      <section className="empty-updates">
        <div className="empty-state">
          <h3>No updates yet</h3>
          <p>Check back soon for the latest updates on tie.ceo and Capsole.io</p>
        </div>
      </section>
    );
  }
  
  return (
    <section className="updates-list">
      {updates.map((update) => (
        <div key={update.id} className="update-card">
          <div className="update-date">
            {new Date(update.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <h2 className="update-title">{update.title}</h2>
          <div className="update-content">
            {update.content.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
} 