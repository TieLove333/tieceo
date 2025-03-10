'use client';

import React from 'react';
import {
  Box,
  Flex,
  Text,
  Heading
} from '@chakra-ui/react';

export default function UpdatesPage() {
  return (
    <Box>
      <Box 
        bg="white" 
        borderRadius="xl" 
        boxShadow="sm" 
        p="6"
      >
        <Heading 
          size="lg" 
          color="gray.700" 
          mb="4"
        >
          Updates
        </Heading>
        <Text color="gray.500">
          Updates page coming soon. Stay tuned for the latest progress on the $1B solo SaaS journey!
        </Text>
      </Box>
    </Box>
  );
} 