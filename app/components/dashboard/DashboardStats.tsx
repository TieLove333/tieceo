'use client';

import React from 'react';
import {
  SimpleGrid,
  Box,
  Stat as ChakraStat,
  StatLabel as ChakraStatLabel,
  Text,
  Icon,
} from '@chakra-ui/react';
import { FiDollarSign, FiUsers, FiUserPlus, FiShoppingCart } from 'react-icons/fi';

interface StatCardProps {
  title: string;
  stat: string;
  icon: React.ElementType;
  percentage: number;
}

const StatCard = ({ title, stat, icon: Icon, percentage }: StatCardProps) => (
  <Box p={5} bg="white" borderRadius="lg" boxShadow="sm">
    <ChakraStat>
      <Box display="flex" alignItems="center" mb={2}>
        <Box
          p={2}
          bg="blue.500"
          borderRadius="md"
          color="white"
          mr={3}
        >
          <Icon size={20} />
        </Box>
        <ChakraStatLabel color="gray.500">{title}</ChakraStatLabel>
      </Box>
      <Text fontSize="2xl" fontWeight="bold">{stat}</Text>
      <Text color={percentage > 0 ? "green.500" : "red.500"} fontSize="sm">
        {percentage > 0 ? '↑' : '↓'} {Math.abs(percentage)}%
      </Text>
    </ChakraStat>
  </Box>
);

interface DashboardStatsProps {
  stats: {
    money: string;
    users: number;
    clients: number;
    sales: string;
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={5}>
      <StatCard
        title="Today's Money"
        stat={stats.money}
        icon={FiDollarSign}
        percentage={55}
      />
      <StatCard
        title="Today's Users"
        stat={stats.users.toString()}
        icon={FiUsers}
        percentage={5}
      />
      <StatCard
        title="New Clients"
        stat={`+${stats.clients}`}
        icon={FiUserPlus}
        percentage={-14}
      />
      <StatCard
        title="Total Sales"
        stat={stats.sales}
        icon={FiShoppingCart}
        percentage={8}
      />
    </SimpleGrid>
  );
} 