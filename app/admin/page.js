'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UpdateForm from '../updates/UpdateForm';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  
  const router = useRouter();
  
  // Check if already authenticated on load
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleAuthenticate = (e) => {
    e.preventDefault();
    // Simple password check - in production, use proper authentication
    if (password === 'tie') {
      setIsAuthenticated(true);
      localStorage.setItem('adminToken', 'true');
      setMessage('');
    } else {
      setMessage('Incorrect password');
    }
  };
  
  const handleUpdateAdded = (newUpdate) => {
    setMessage('Update published successfully!');
    // Optionally redirect to updates page to see the new update
    // router.push('/updates');
  };
  
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          
          {message && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {message}
            </div>
          )}
          
          <form onSubmit={handleAuthenticate} className="space-y-4">
            <div>
              <label htmlFor="password" className="block mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-slate-700 text-white py-2 rounded-md hover:bg-slate-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-slate-800">Admin Dashboard</h1>
        
        {message && (
          <div className="bg-green-100 text-green-700 p-4 rounded-md mb-8">
            {message}
          </div>
        )}
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Create New Update</h2>
          <UpdateForm onUpdateAdded={handleUpdateAdded} />
        </div>
      </div>
    </main>
  );
} 