'use client';

import { useState } from 'react';

export default function UpdateForm({ onUpdateAdded }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/updates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create update');
      }

      const newUpdate = await response.json();

      // Reset form
      setTitle('');
      setContent('');
      
      // Notify parent component
      if (onUpdateAdded) {
        onUpdateAdded(newUpdate);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="update-form-container">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block mb-2">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows={5}
            required
            disabled={isSubmitting}
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-slate-700 text-white py-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post Update'}
        </button>
      </form>
    </div>
  );
} 