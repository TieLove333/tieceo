'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from './dashboard/Sidebar';
import { Providers } from "../providers";
import { Box } from '@chakra-ui/react';

export const RootLayoutClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Only render sidebar after component mounts to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Providers>
      <Box 
        display="flex" 
        minH="100vh" 
        bg="gray.100"
      >
        {mounted && <Sidebar />}
        <Box 
          flex="1" 
          ml={{ base: 0, md: '300px' }}
          transition=".3s ease"
          p="6"
        >
          {children}
        </Box>
      </Box>
    </Providers>
  );
} 