'use client';

import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

interface DashboardStatCardProps {
  title: string;
  chart: React.ReactNode;
}

export default function DashboardStatCard(props: DashboardStatCardProps) {
  const { title, chart } = props;

  return (
    <Box
      p="20px"
      bg="white"
      borderRadius="12px"
      boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
      h="100%"
    >
      <Flex direction="column" h="100%">
        <Text fontSize="lg" color="gray.700" fontWeight="bold" mb="12px">
          {title}
        </Text>
        <Box h="100%" w="100%">
          {chart}
        </Box>
      </Flex>
    </Box>
  );
} 