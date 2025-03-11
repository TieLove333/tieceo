'use client';

import { useState, useEffect } from 'react';

interface StripeStat {
  value: string | number;
  change: number;
}

interface StripeStats {
  arr: StripeStat;
  mrr: StripeStat;
  users: StripeStat;
  sales: StripeStat;
}

interface StripeMetricsResponse {
  stats: StripeStats;
}

export default function useStripeDashboardMetrics() {
  const [stats, setStats] = useState<StripeStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/stripe-dashboard-metrics');
        
        // Even if the response is not OK, we'll still try to parse it
        // because our API now returns fallback data instead of errors
        const data = await response.json();
        
        if (data.stats) {
          setStats(data.stats);
          setError(null);
        } else if (data.error) {
          // If there's an explicit error message, show it
          console.warn('API returned an error:', data.error);
          setError(data.error);
        } else {
          // Unexpected response format
          console.warn('Unexpected API response format:', data);
          setError('Unexpected response format from API');
        }
      } catch (err: any) {
        // This will only happen if there's a network error or JSON parsing error
        console.error('Error fetching Stripe metrics:', err);
        setError('Network or parsing error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return { stats, isLoading, error };
}
