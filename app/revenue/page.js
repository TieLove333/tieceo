'use client';

import { useState, useEffect } from 'react';

export default function Revenue() {
  const [metrics, setMetrics] = useState({
    monthlyRecurringRevenue: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    subscriptionBreakdown: {
      subscription: 0,
      consulting: 0
    }
  });

  useEffect(() => {
    async function fetchStripeMetrics() {
      try {
        const response = await fetch('/api/stripe-metrics');
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error('Failed to fetch Stripe metrics', error);
      }
    }

    fetchStripeMetrics();
  }, []);

  // Calculate progress towards $1B goal
  const currentProgress = (metrics.totalRevenue / 1000000000) * 100;

  return (
    <main className="revenue-page">
      <section className="revenue-header">
        <h1>Revenue Dashboard</h1>
        <p>Building a $1B SaaS, one user at a time</p>
      </section>

      <section className="revenue-goals">
        <h2>Journey to $1B</h2>
        <div className="goal-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${currentProgress}%` }}
            >
              <div className="progress-marker"></div>
              <div className="progress-marker"></div>
              <div className="progress-marker"></div>
              <div className="progress-marker"></div>
              <div className="progress-marker"></div>
            </div>
          </div>
          <div className="goal-details">
            <span>Current: ${metrics.totalRevenue.toLocaleString()}</span>
            <span>Goal: $1,000,000,000</span>
          </div>
        </div>
      </section>

      <section className="revenue-metrics">
        <div className="metric-grid">
          <div className="metric-card">
            <h3>Monthly Recurring Revenue</h3>
            <div className="metric-value">${metrics.monthlyRecurringRevenue.toLocaleString()}</div>
            <div className="metric-trend">
              <span className="trend-icon">↑</span>
              <span className="trend-percentage">0%</span>
            </div>
          </div>

          <div className="metric-card">
            <h3>Total Revenue 2025+</h3>
            <div className="metric-value">${metrics.totalRevenue.toLocaleString()}</div>
            <div className="metric-trend">
              <span className="trend-icon">→</span>
              <span className="trend-percentage">No Change</span>
            </div>
          </div>

          <div className="metric-card">
            <h3>Users</h3>
            <div className="metric-value">{metrics.totalCustomers}</div>
            <div className="metric-trend">
              <span className="trend-icon">↑</span>
              <span className="trend-percentage">0%</span>
            </div>
          </div>
        </div>
      </section>

      <section className="revenue-breakdown">
        <h2>Revenue Streams</h2>
        <div className="breakdown-grid">
          <div className="breakdown-card">
            <h3>Subscription Revenue</h3>
            <div className="breakdown-value">${metrics.subscriptionBreakdown.subscription.toLocaleString()}</div>
          </div>
          <div className="breakdown-card">
            <h3>Consulting Revenue</h3>
            <div className="breakdown-value">${metrics.subscriptionBreakdown.consulting.toLocaleString()}</div>
          </div>
        </div>
      </section>
    </main>
  );
} 