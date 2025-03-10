'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface LineChartProps {
  data: any[];
  options: any;
}

export default function LineChart(props: LineChartProps) {
  const { data, options } = props;

  // Check if we're in the browser environment
  if (typeof window === 'undefined') {
    return <div>Loading chart...</div>;
  }

  return (
    <Chart
      options={options}
      series={data}
      type="line"
      width="100%"
      height="100%"
    />
  );
} 