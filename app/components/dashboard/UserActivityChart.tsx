'use client';

import React from 'react';

export function UserActivityChart() {
  return (
    <article className="flex flex-col grow px-5 py-5 w-[59%] bg-white rounded-2xl shadow-sm max-md:w-full">
      <header className="flex flex-col">
        <h2 className="text-xs font-bold text-slate-400">Active Users</h2>
        <div className="flex gap-1 mt-1">
          <span className="text-sm font-bold text-emerald-500">(+23)</span>
          <span className="text-sm text-slate-400">than last week</span>
        </div>
      </header>

      <div className="flex gap-5 justify-between mt-8 w-full text-center whitespace-nowrap">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/e63775f9de4343d8b56711d7431bf688/73ea343a5048042b2351eb35003ab8de704284026eb9f51a17075e90e246d454"
              className="w-4 h-4"
              alt=""
            />
          </div>
          <div className="mt-3 text-sm font-bold">Users</div>
          <div className="mt-1 text-2xl font-bold">32,984</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/e63775f9de4343d8b56711d7431bf688/43aba798bc753a5f01a5e36816717e203a1920e1edc4d7ddec12247439cc58a1"
              className="w-4 h-4"
              alt=""
            />
          </div>
          <div className="mt-3 text-sm font-bold">Clicks</div>
          <div className="mt-1 text-2xl font-bold">2,42m</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/e63775f9de4343d8b56711d7431bf688/31885e0c4845d427fb0ad61b404c247e973a1a0460bbb89eda8734ab69124589"
              className="w-4 h-4"
              alt=""
            />
          </div>
          <div className="mt-3 text-sm font-bold">Sales</div>
          <div className="mt-1 text-2xl font-bold">2,400$</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/e63775f9de4343d8b56711d7431bf688/6c4a1e94de0ca4233b8b72d47ce4a90e2f705f43fbaa395777d18279ee229480"
              className="w-4 h-4"
              alt=""
            />
          </div>
          <div className="mt-3 text-sm font-bold">Items</div>
          <div className="mt-1 text-2xl font-bold">320</div>
        </div>
      </div>

      <div className="mt-8 h-[200px] bg-gray-50 rounded-xl">
        {/* Chart will be implemented here */}
      </div>
    </article>
  );
} 