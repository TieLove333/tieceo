'use client';

import { useState, useEffect } from 'react';
import styles from './Updates.module.css';

export default function UpdatesList() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUpdates = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching updates...');
      const response = await fetch('/api/updates');
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      
      if (data.success && Array.isArray(data.updates)) {
        setUpdates(data.updates);
      } else {
        setError('Invalid response format from server');
      }
    } catch (err) {
      console.error('Error fetching updates:', err);
      setError('Failed to load updates: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  if (loading) return <div className="loading">Loading updates...</div>;
  
  return (
    <div className="updates-container">
      {error && <div className="error-message">{error}</div>}
      
      <div className="updates-controls">
        <button onClick={fetchUpdates} className="refresh-button">
          Refresh Updates
        </button>
      </div>
      
      {updates.length === 0 ? (
        <p className="no-updates">No updates available yet.</p>
      ) : (
        <div className="updates-list">
          {updates.map((update) => (
            <div key={update.id} className="update-item">
              <h3 className="update-title">{update.title}</h3>
              <p className="update-date">{new Date(update.created_at).toLocaleDateString()}</p>
              <div className="update-content">{update.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 