'use client';

import React from 'react';
import { Box, Text, HStack, Link } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box as="footer" mt={8} py={6}>
      <HStack spacing={6} justify="center" color="gray.500" fontSize="sm">
        <Text>© 2024, Made with ❤️ by tie.ceo</Text>
        <Link href="#" _hover={{ color: 'blue.500' }}>About</Link>
        <Link href="#" _hover={{ color: 'blue.500' }}>Blog</Link>
        <Link href="#" _hover={{ color: 'blue.500' }}>License</Link>
      </HStack>
    </Box>
  );
} 