'use client';

import { useState } from 'react';
import styles from './Updates.module.css';

export default function UpdateForm({ onUpdateAdded }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

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
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create update');
      }

      const data = await response.json();
      console.log('Response data:', data);
      
      // Reset form
      setTitle('');
      setContent('');
      setSuccess(true);
      
      // Notify parent component
      if (onUpdateAdded) {
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
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Update posted successfully!</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isSubmitting}
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