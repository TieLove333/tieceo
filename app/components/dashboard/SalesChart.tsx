'use client';

import React from 'react';

export function SalesChart() {
  return (
    <article className="flex flex-col grow px-5 py-5 w-[41%] bg-white rounded-2xl shadow-sm max-md:w-full">
      <header className="flex flex-col">
        <h2 className="text-xs font-bold text-slate-400">Sales overview</h2>
        <div className="flex gap-1 mt-1">
          <span className="text-sm font-bold text-emerald-500">(+5)</span>
          <span className="text-sm text-slate-400">more in 2021</span>
        </div>
      </header>

      <div className="mt-8 h-[200px] bg-gray-50 rounded-xl">
        {/* Chart will be implemented here */}
      </div>
    </article>
  );
} 