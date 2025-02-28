'use client';

import { useState, useEffect } from 'react';

export default function UpdatesList() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dbStatus, setDbStatus] = useState(null);

  // First check database connection
  useEffect(() => {
    async function checkDatabase() {
      try {
        const response = await fetch('/api/db-test');
        const data = await response.json();
        setDbStatus(data);
        
        if (data.success && data.updatesTableExists) {
          fetchUpdates();
        } else {
          setError('Database setup issue. Please check server logs.');
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to check database: ' + err.message);
        setLoading(false);
      }
    }
    
    checkDatabase();
  }, []);

  const fetchUpdates = async () => {
    try {
      const response = await fetch('/api/updates');
      const data = await response.json();
      
      if (data.success && Array.isArray(data.updates)) {
        setUpdates(data.updates);
        setError(null);
      } else {
        setError(data.error || 'Invalid response from server');
      }
    } catch (err) {
      setError('Failed to load updates: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="text-center p-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2">Loading updates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
          {dbStatus && (
            <div className="mt-2 text-sm">
              <p>Database Status:</p>
              <pre className="bg-gray-100 p-2 rounded mt-1 overflow-auto">
                {JSON.stringify(dbStatus, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
      
      <div className="mb-4">
        <button 
          onClick={fetchUpdates}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Refresh Updates
        </button>
      </div>
      
      {updates.length === 0 ? (
        <p className="text-gray-500">No updates available yet.</p>
      ) : (
        <div className="space-y-4">
          {updates.map((update) => (
            <div key={update.id} className="border rounded p-4 bg-white shadow-sm">
              <h3 className="text-xl font-bold">{update.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(update.created_at).toLocaleDateString()}
              </p>
              <p>{update.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 