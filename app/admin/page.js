'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  
  const router = useRouter();
  
  const handleAuthenticate = (e) => {
    e.preventDefault();
    // Simple password check - in production, use proper authentication
    if (password === 'tie2024') {
      setIsAuthenticated(true);
      setMessage('');
    } else {
      setMessage('Incorrect password');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !content) {
      setMessage('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/updates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          date: new Date().toISOString(),
        }),
      });
      
      if (response.ok) {
        setTitle('');
        setContent('');
        setMessage('Update published successfully!');
        router.refresh();
      } else {
        setMessage('Failed to publish update');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isAuthenticated) {
    return (
      <main className="admin-page">
        <section className="admin-header">
          <h1>Admin Login</h1>
        </section>
        
        <section className="admin-form">
          <form onSubmit={handleAuthenticate}>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {message && <div className="form-message error">{message}</div>}
            
            <button type="submit" className="submit-button">
              Login
            </button>
          </form>
        </section>
      </main>
    );
  }
  
  return (
    <main className="admin-page">
      <section className="admin-header">
        <h1>Publish Update</h1>
        <p>Share your latest progress with your audience</p>
      </section>
      
      <section className="admin-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="10"
              required
            ></textarea>
          </div>
          
          {message && <div className="form-message success">{message}</div>}
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Update'}
          </button>
        </form>
      </section>
    </main>
  );
} 