'use client';

import { useState } from 'react';

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple hardcoded password
    if (password === 'tie') {
      localStorage.setItem('adminToken', 'true');
      onLogin(true);
    } else {
      setError('Invalid password');
      localStorage.removeItem('adminToken');
    }
  };

  return (
    <div className="admin-login-container">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div>
          <label htmlFor="password" className="block mb-2">Password</label>
          <input 
            type="password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-slate-700 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
} 