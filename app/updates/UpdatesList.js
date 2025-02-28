'use client';

import { useState, useEffect } from 'react';
import styles from './Updates.module.css';

export default function UpdatesList() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    async function fetchUpdates() {
      try {
        console.log('Fetching updates...');
        const response = await fetch('/api/updates');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error('Failed to fetch updates');
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        
        setDebugInfo({
          responseStatus: response.status,
          dataReceived: !!data,
          updatesArray: Array.isArray(data.updates),
          updatesCount: data.updates ? data.updates.length : 0
        });
        
        setUpdates(data.updates || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching updates:', err);
        setError('Failed to load updates. Please try again later.');
        setDebugInfo({ error: err.message });
        setLoading(false);
      }
    }

    fetchUpdates();
  }, []);

  if (loading) return <div>Loading updates...</div>;
  
  return (
    <div className="updates-container">
      {error && <div className="error">{error}</div>}
      
      {debugInfo && (
        <div className="debug-info" style={{background: '#f0f0f0', padding: '10px', marginBottom: '20px', fontSize: '12px'}}>
          <h4>Debug Info:</h4>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
      )}
      
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