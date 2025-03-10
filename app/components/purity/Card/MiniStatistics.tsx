'use client';

import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';

interface MiniStatisticsProps {
  title: string;
  amount: string;
  percentage?: number;
  icon: React.ReactNode;
}

export default function MiniStatistics(props: MiniStatisticsProps) {
  const { title, amount, percentage, icon } = props;

  return (
    <Box
      p="20px"
      bg="white"
      borderRadius="12px"
      boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
    >
      <Flex justify="space-between" align="center">
        <Box>
          <Text
            fontSize="sm"
            color="gray.500"
            fontWeight="bold"
            pb="2px"
          >
            {title}
          </Text>
          <Flex>
            <Text fontSize="lg" color="gray.700" fontWeight="bold">
              {amount}
            </Text>
            {percentage && (
              <Text
                fontSize="sm"
                color={percentage > 0 ? "green.400" : "red.400"}
                fontWeight="bold"
                pl="5px"
                alignSelf="flex-end"
              >
                {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
              </Text>
            )}
          </Flex>
        </Box>
        {icon}
      </Flex>
    </Box>
  );
} 