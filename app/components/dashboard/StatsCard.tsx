'use client';

import React from 'react';
import { Box, Flex, Text, Image, Stack } from '@chakra-ui/react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: string;
  className?: string;
}

export function StatsCard({ title, value, change, changeType, icon, className }: StatsCardProps) {
  return (
    <Box 
      p="6" 
      bg="white" 
      borderRadius="xl" 
      boxShadow="sm"
      className={className}
      width="100%"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Stack spacing="1">
          <Text fontSize="xs" color="gray.400">{title}</Text>
          <Text fontSize="xl" fontWeight="bold">{value}</Text>
          <Flex alignItems="center" mt="1">
            <Text 
              fontSize="xs" 
              fontWeight="medium" 
              color={changeType === 'positive' ? 'green.500' : 'red.500'}
            >
              {change}
            </Text>
          </Flex>
        </Stack>
        <Flex 
          alignItems="center" 
          justifyContent="center" 
          w="14" 
          h="14" 
          borderRadius="lg" 
          bg={changeType === 'positive' ? 'teal.100' : 'red.100'}
        >
          <Image 
            src={icon} 
            alt={title} 
            width="7" 
            height="7"
          />
        </Flex>
      </Flex>
    </Box>
  );
} 