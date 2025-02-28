'use client';

import { useState } from 'react';
import styles from './Updates.module.css';

export default function UpdateForm({ onUpdateAdded }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    setDebugInfo(null);

    try {
      console.log('Submitting update:', { title, content });
      
      const response = await fetch('/api/updates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      setDebugInfo({
        responseStatus: response.status,
        dataReceived: !!data,
        success: data.success
      });
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create update');
      }

      if (!data.success) {
        throw new Error(data.error || 'Server reported failure');
      }
      
      // Reset form
      setTitle('');
      setContent('');
      setSuccess(true);
      
      // Notify parent component
      if (onUpdateAdded && data.update) {
        onUpdateAdded(data.update);
      }
    } catch (err) {
      console.error('Error creating update:', err);
      setError(err.message || 'Failed to create update. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="update-form-container">
      <h2>Post a New Update</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Update posted successfully!</div>}
      
      {process.env.NODE_ENV === 'development' && debugInfo && (
        <div className="debug-info" style={{background: '#f0f0f0', padding: '10px', marginBottom: '20px', fontSize: '12px'}}>
          <h4>Debug Info:</h4>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isSubmitting}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={isSubmitting}
            rows={5}
            className="form-textarea"
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? 'Posting...' : 'Post Update'}
        </button>
      </form>
    </div>
  );
} 