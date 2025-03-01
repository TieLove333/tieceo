'use client';

import { useState, useEffect } from 'react';
import UpdateForm from './UpdateForm';
import AdminLogin from './AdminLogin';

export default function UpdatesPage() {
  const [updates, setUpdates] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch updates from API
    const fetchUpdates = async () => {
      try {
        const response = await fetch('/api/updates');
        const data = await response.json();
        
        // Sort updates by date, newest first
        setUpdates(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching updates:', error);
        setLoading(false);
      }
    };

    // Check admin status (simple client-side check)
    const checkAdminStatus = () => {
      const adminToken = localStorage.getItem('adminToken');
      setIsAdmin(adminToken === 'true');
    };

    fetchUpdates();
    checkAdminStatus();
  }, []);

  const handleUpdateAdded = (newUpdate) => {
    setUpdates([newUpdate, ...updates]);
  };

  const handleLogin = (loginStatus) => {
    setIsAdmin(loginStatus);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin ? (
        <div className="container max-w-md mx-auto px-4 py-8">
          <AdminLogin onLogin={handleLogin} />
        </div>
      ) : (
        <div className="container max-w-2xl mx-auto px-4 py-8">
          <UpdateForm onUpdateAdded={handleUpdateAdded} />
        </div>
      )}

      <div className="container flex flex-col items-center justify-center text-center mb-8">
        <h1 className="hero-title mb-4 w-full text-center">
          The Journey So Far
        </h1>
        <p className="hero-description mb-8 w-full text-center">
          Documenting every step of the $1B Solo SaaS Challenge
        </p>
      </div>

      <div className="update-card-container">
        {loading ? (
          <div className="text-center text-slate-600">Loading updates...</div>
        ) : updates.length === 0 ? (
          <div className="text-center text-slate-600">
            No updates yet. Stay tuned!
          </div>
        ) : (
          updates.map((update) => (
            <div key={update.id} className="update-card">
              <div className="update-card-content">
                <div className="update-date">
                  {new Date(update.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h2 className="update-title">{update.title}</h2>
                <div className="update-text">{update.content}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 