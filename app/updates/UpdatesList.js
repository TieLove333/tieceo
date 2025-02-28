'use client';

import { useState, useEffect } from 'react';
import styles from './Updates.module.css';

export default function UpdatesList() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [rawResponse, setRawResponse] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchUpdates = async (isRetry = false) => {
    if (isRetry) {
      setRetryCount(prev => prev + 1);
    } else {
      setLoading(true);
      setError(null);
      setRawResponse(null);
    }
    
    try {
      console.log(`${isRetry ? 'Retrying' : 'Fetching'} updates... (attempt ${retryCount + 1})`);
      
      // Add a cache-busting query parameter to avoid cached error responses
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/updates?t=${timestamp}`);
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
        updatesCount: data.updates ? data.updates.length : 0,
        retryCount
      });
      
      if (data.success && Array.isArray(data.updates)) {
        setUpdates(data.updates);
      } else {
        setError(`Invalid response format from server: ${data.error || 'Unknown error'}`);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching updates:', err);
      setError('Failed to load updates: ' + err.message);
      setDebugInfo({ error: err.message, retryCount });
      setLoading(false);
      
      // Auto-retry once after 3 seconds if it's a parsing error (likely a timeout)
      if (!isRetry && err.message.includes('parse') && retryCount < 2) {
        console.log('Scheduling retry in 3 seconds...');
        setTimeout(() => fetchUpdates(true), 3000);
      }
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const refreshUpdates = () => {
    setRetryCount(0);
    fetchUpdates();
  };

  if (loading && retryCount === 0) return <div className="loading">Loading updates...</div>;
  if (loading && retryCount > 0) return <div className="loading">Retrying... (attempt {retryCount})</div>;
  
  return (
    <div className="updates-container">
      {error && (
        <div className="error-message">
          {error}
          {retryCount < 3 && (
            <button 
              onClick={() => fetchUpdates(true)} 
              className="retry-button"
              style={{marginLeft: '10px'}}
            >
              Retry
            </button>
          )}
        </div>
      )}
      
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