'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface BarChartProps {
  data: any[];
  options: any;
}

export default function BarChart(props: BarChartProps) {
  const { data, options } = props;

  // Check if we're in the browser environment
  if (typeof window === 'undefined') {
    return <div>Loading chart...</div>;
  }

  return (
    <Chart
      options={options}
      series={data}
      type="bar"
      width="100%"
      height="100%"
    />
  );
} 