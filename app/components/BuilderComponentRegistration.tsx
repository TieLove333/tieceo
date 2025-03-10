'use client';

import { useEffect } from 'react';
import { Builder, builder } from '@builder.io/react';
import React from 'react';

// Import only what we need directly
import MiniStatistics from './purity/Card/MiniStatistics';
import DashboardStatCard from './purity/Card/DashboardStatCard';
import LineChart from './purity/Charts/LineChart';
import BarChart from './purity/Charts/BarChart';
import { Box, Button } from '@chakra-ui/react';

// Component that registers Builder components on the client side
export default function BuilderComponentRegistration() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      // Initialize Builder
      builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || '');

      // Reset builder components array
      Builder.components = [];
      
      // Register components
      Builder.registerComponent(MiniStatistics, {
        name: 'StatsCard',
        inputs: [
          { name: 'title', type: 'string', defaultValue: 'Today\'s Money' },
          { name: 'amount', type: 'string', defaultValue: '$53,000' },
          { name: 'percentage', type: 'number', defaultValue: 55 }
        ]
      });

      Builder.registerComponent(DashboardStatCard, {
        name: 'ChartCard',
        inputs: [
          { name: 'title', type: 'string', defaultValue: 'Sales Overview' }
        ]
      });

      Builder.registerComponent(LineChart, {
        name: 'LineChart',
        inputs: []
      });

      Builder.registerComponent(BarChart, {
        name: 'BarChart',
        inputs: []
      });

      Builder.registerComponent(Box, {
        name: 'Box',
        inputs: [
          { name: 'padding', type: 'number', defaultValue: 4 },
          { name: 'background', type: 'string', defaultValue: 'gray.100' }
        ]
      });

      Builder.registerComponent(Button, {
        name: 'Button',
        inputs: [
          { name: 'children', type: 'text', defaultValue: 'Click me' },
          { name: 'colorScheme', type: 'string', defaultValue: 'blue' }
        ]
      });

      console.log('✅ Registered components with Builder.io');
    } catch (error) {
      console.error('Error registering Builder.io components:', error);
    }
  }, []);

  return null;
} 