'use client';

import React from 'react';

export function DashboardFooter() {
  return (
    <footer className="flex justify-between items-center mt-8 text-xs text-slate-400">
      <div className="flex gap-1">
        © 2024, Made with ❤️ by{' '}
        <a href="https://x.com/tielove333" target="_blank" rel="noopener noreferrer" className="text-teal-500">
          Tie
        </a>
      </div>
      <div className="flex gap-4">
        <a href="#" className="hover:text-teal-500 transition-colors">About Us</a>
        <a href="#" className="hover:text-teal-500 transition-colors">Blog</a>
        <a href="#" className="hover:text-teal-500 transition-colors">License</a>
      </div>
    </footer>
  );
} 