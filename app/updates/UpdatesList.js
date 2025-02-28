'use client';

import { useState, useEffect } from 'react';

export default function UpdatesList() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dbStatus, setDbStatus] = useState(null);
  const [newUpdate, setNewUpdate] = useState({ title: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // First check database connection
  useEffect(() => {
    async function checkDatabase() {
      try {
        const response = await fetch('/api/db-test');
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setDbStatus(data);
        
        if (data.success && data.updatesTableExists) {
          fetchUpdates();
        } else {
          // Try to set up the database
          await setupDatabase();
        }
      } catch (err) {
        console.error('Database check error:', err);
        setError('Failed to check database: ' + err.message);
        setLoading(false);
      }
    }
    
    checkDatabase();
  }, []);

  const setupDatabase = async () => {
    try {
      const response = await fetch('/api/setup-db');
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      if (data.success) {
        fetchUpdates();
      } else {
        setError('Failed to set up database: ' + (data.error || 'Unknown error'));
        setLoading(false);
      }
    } catch (err) {
      console.error('Database setup error:', err);
      setError('Failed to set up database: ' + err.message);
      setLoading(false);
    }
  };

  const fetchUpdates = async () => {
    try {
      const response = await fetch('/api/updates');
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success && Array.isArray(data.updates)) {
        setUpdates(data.updates);
        setError(null);
      } else {
        setError(data.error || 'Invalid response from server');
      }
    } catch (err) {
      console.error('Error fetching updates:', err);
      setError('Failed to load updates: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUpdate(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      const response = await fetch('/api/updates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUpdate),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setNewUpdate({ title: '', content: '' });
        setSubmitSuccess(true);
        fetchUpdates();
      } else {
        setSubmitError(data.error || 'Failed to submit update');
      }
    } catch (err) {
      console.error('Error submitting update:', err);
      setSubmitError('Failed to submit update: ' + err.message);
    } finally {
      setSubmitting(false);
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
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Updates</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
          {dbStatus && (
            <div className="mt-2 text-sm">
              <p>Database Status:</p>
              <pre className="bg-gray-100 p-2 rounded mt-1 overflow-auto text-xs">
                {JSON.stringify(dbStatus, null, 2)}
              </pre>
            </div>
          )}
          <div className="mt-2">
            <button 
              onClick={setupDatabase}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
            >
              Setup Database
            </button>
          </div>
        </div>
      )}
      
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Update</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newUpdate.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 mb-2">Content</label>
            <textarea
              id="content"
              name="content"
              value={newUpdate.content}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Add Update'}
          </button>
          
          {submitError && (
            <div className="mt-3 text-red-500 text-sm">
              {submitError}
            </div>
          )}
          
          {submitSuccess && (
            <div className="mt-3 text-green-500 text-sm">
              Update added successfully!
            </div>
          )}
        </form>
      </div>
      
      <div className="mb-4">
        <button 
          onClick={fetchUpdates}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
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