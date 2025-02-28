'use client';

import { useState, useEffect } from 'react';
import styles from './Updates.module.css';

export default function UpdatesList() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUpdates() {
      try {
        const response = await fetch('/api/updates');
        if (!response.ok) {
          throw new Error('Failed to fetch updates');
        }
        const data = await response.json();
        setUpdates(data.updates || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching updates:', err);
        setError('Failed to load updates. Please try again later.');
        setLoading(false);
      }
    }

    fetchUpdates();
  }, []);

  if (loading) return <div>Loading updates...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="updates-container">
      {updates.length === 0 ? (
        <p>No updates available yet.</p>
      ) : (
        updates.map((update) => (
          <div key={update.id} className="update-item">
            <h3>{update.title}</h3>
            <p className="date">{new Date(update.created_at).toLocaleDateString()}</p>
            <div className="content">{update.content}</div>
          </div>
        ))
      )}
    </div>
  );
} 