'use client';

import { useState, useEffect } from 'react';
import styles from './Updates.module.css';

export default function UpdatesList() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [rawResponse, setRawResponse] = useState(null);

  useEffect(() => {
    async function fetchUpdates() {
      try {
        console.log('Fetching updates...');
        const response = await fetch('/api/updates');
        console.log('Response status:', response.status);
        
        // Store the raw text response for debugging
        const responseText = await response.text();
        setRawResponse(responseText);
        
        // Try to parse the response as JSON
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('JSON parse error:', parseError);
          throw new Error(`Failed to parse JSON response: ${parseError.message}. Raw response: ${responseText.substring(0, 200)}...`);
        }
        
        console.log('Received data:', data);
        
        setDebugInfo({
          responseStatus: response.status,
          dataReceived: !!data,
          success: data.success,
          updatesArray: Array.isArray(data.updates),
          updatesCount: data.updates ? data.updates.length : 0
        });
        
        if (data.success && Array.isArray(data.updates)) {
          setUpdates(data.updates);
        } else {
          setError('Invalid response format from server');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching updates:', err);
        setError('Failed to load updates: ' + err.message);
        setDebugInfo({ error: err.message });
        setLoading(false);
      }
    }

    fetchUpdates();
  }, []);

  const refreshUpdates = async () => {
    setLoading(true);
    setError(null);
    setRawResponse(null);
    
    try {
      const response = await fetch('/api/updates');
      
      // Store the raw text response for debugging
      const responseText = await response.text();
      setRawResponse(responseText);
      
      // Try to parse the response as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error(`Failed to parse JSON response: ${parseError.message}. Raw response: ${responseText.substring(0, 200)}...`);
      }
      
      if (data.success && Array.isArray(data.updates)) {
        setUpdates(data.updates);
      } else {
        setError('Invalid response format from server');
      }
    } catch (err) {
      setError('Failed to refresh updates: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading updates...</div>;
  
  return (
    <div className="updates-container">
      {error && <div className="error-message">{error}</div>}
      
      {process.env.NODE_ENV !== 'production' && (
        <div className="debug-info" style={{background: '#f0f0f0', padding: '10px', marginBottom: '20px', fontSize: '12px'}}>
          <h4>Debug Info:</h4>
          {debugInfo && <pre>{JSON.stringify(debugInfo, null, 2)}</pre>}
          
          {rawResponse && (
            <>
              <h5>Raw Response:</h5>
              <pre style={{maxHeight: '200px', overflow: 'auto'}}>{rawResponse.substring(0, 500)}{rawResponse.length > 500 ? '...' : ''}</pre>
            </>
          )}
        </div>
      )}
      
      <div className="updates-controls">
        <button onClick={refreshUpdates} className="refresh-button">
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