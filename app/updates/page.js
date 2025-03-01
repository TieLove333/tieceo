'use client';

// Version: 1.0.2 - Enhanced styling with professional cards
import { useState, useEffect } from 'react';
import UpdateForm from './UpdateForm';
import AdminLogin from './AdminLogin';
import { Button } from "../../src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../src/components/ui/card";

export default function UpdatesPage() {
  const [updates, setUpdates] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch updates from API
    const fetchUpdates = async () => {
      try {
        // Add cache-busting timestamp to prevent browser caching
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/updates?t=${timestamp}`);
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

  const handleForceRefresh = () => {
    setLoading(true);
    // Force reload the page
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="container flex flex-col items-center justify-center text-center mb-8 pt-12">
        <h1 className="text-4xl font-bold mb-4 text-slate-800">
          The Journey So Far
        </h1>
        <p className="text-slate-600 mb-8 max-w-xl text-lg">
          Documenting every step of the $1B Solo SaaS Challenge
        </p>
        <Button 
          onClick={handleForceRefresh}
          variant="outline"
          size="sm"
          className="mb-4 hover:bg-slate-100"
        >
          Refresh Page
        </Button>
      </div>

      {!isAdmin ? (
        <div className="container max-w-md mx-auto px-4 py-4 admin-login-enhanced">
          <div className="form-container-enhanced">
            <div className="form-header-enhanced">
              <h2 className="form-title-enhanced text-center">Admin Login</h2>
            </div>
            <div className="form-content-enhanced">
              <AdminLogin onLogin={handleLogin} />
            </div>
          </div>
        </div>
      ) : (
        <div className="container max-w-2xl mx-auto px-4 py-4 mb-16">
          <UpdateForm onUpdateAdded={handleUpdateAdded} />
        </div>
      )}

      <div className="container max-w-3xl mx-auto px-4 py-8 space-y-16">
        {loading ? (
          <div className="text-center text-slate-600 py-12 text-lg">
            <div className="animate-pulse">Loading updates...</div>
          </div>
        ) : updates.length === 0 ? (
          <div className="text-center text-slate-600 py-12 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-xl font-semibold mb-2">No updates yet</h3>
            <p>Stay tuned for the latest updates on our journey!</p>
          </div>
        ) : (
          updates.map((update) => (
            <div key={update.id} className="card-enhanced">
              <div className="card-header-enhanced">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="card-title-enhanced">{update.title}</h2>
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                    {update.category || 'General'}
                  </span>
                </div>
                <p className="card-date-enhanced">
                  {new Date(update.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="card-content-enhanced">
                <div 
                  className="prose" 
                  dangerouslySetInnerHTML={{ __html: update.content }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 