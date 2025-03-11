'use client';

import React, { useState, useEffect } from 'react';
import { getUpdates } from '../lib/supabase';
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Heading,
  VStack,
  Badge,
  Spinner,
  Alert,
  AlertIcon,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';

interface Update {
  id: number;
  title: string;
  content: string;
  category: string;
  publish_date: string;
  created_at: string;
  updated_at: string;
}

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Fetch updates
  useEffect(() => {
    async function fetchUpdates() {
      try {
        setLoading(true);
        const { data, error } = await getUpdates();
        
        if (error) {
          setError(error.message);
        } else {
          setUpdates(data || []);
        }
      } catch (err) {
        setError('Failed to fetch updates');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUpdates();
  }, []);

  // Load Twitter widgets when updates change
  useEffect(() => {
    // @ts-ignore
    if (window.twttr) {
      // @ts-ignore
      window.twttr.widgets.load();
    }
  }, [updates]);

  if (loading) {
    return (
      <Container maxW="container.xl" py={12}>
        <Flex justify="center" align="center" minH="50vh">
          <Spinner size="xl" />
        </Flex>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={12}>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      </Container>
    );
  }

  // Get the most recent update
  const featuredUpdate = updates[0];
  const remainingUpdates = updates.slice(1);

  return (
    <Container maxW="container.xl" py={12}>
      {/* Featured Update */}
      {featuredUpdate && (
        <Box
          bg={bgColor}
          p={8}
          borderRadius="xl"
          boxShadow="md"
          borderWidth="1px"
          borderColor={borderColor}
          mb={8}
        >
          <Badge 
            colorScheme={getCategoryColor(featuredUpdate.category)}
            mb={2}
          >
            {featuredUpdate.category}
          </Badge>
          <Heading size="xl" mb={4}>
            {featuredUpdate.title}
          </Heading>
          <Text color="gray.500" fontSize="sm" mb={4}>
            {new Date(featuredUpdate.publish_date).toLocaleDateString()}
          </Text>
          <Box 
            className="update-content featured"
            dangerouslySetInnerHTML={{ __html: featuredUpdate.content }}
            sx={{
              '& img': {
                maxW: '100%',
                h: 'auto',
                borderRadius: 'md',
              }
            }}
          />
        </Box>
      )}

      {/* Remaining Updates Grid */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {remainingUpdates.map((update) => (
          <Box
            key={update.id}
            bg={bgColor}
            p={6}
            borderRadius="xl"
            boxShadow="sm"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Badge 
              colorScheme={getCategoryColor(update.category)}
              mb={2}
            >
              {update.category}
            </Badge>
            <Heading size="md" mb={3}>
              {update.title}
            </Heading>
            <Text color="gray.500" fontSize="sm" mb={3}>
              {new Date(update.publish_date).toLocaleDateString()}
            </Text>
            <Box 
              className="update-content"
              dangerouslySetInnerHTML={{ __html: update.content }}
              sx={{
                '& img': {
                  maxW: '100%',
                  h: 'auto',
                  borderRadius: 'md',
                }
              }}
            />
          </Box>
        ))}
      </SimpleGrid>

      {/* No Updates Message */}
      {updates.length === 0 && (
        <Box textAlign="center" py={12}>
          <Text color="gray.500">
            No updates yet. Check back soon for the latest progress on the $1B solo SaaS journey!
          </Text>
        </Box>
      )}
    </Container>
  );
}

// Helper function to get badge color based on category
function getCategoryColor(category: string): string {
  switch (category.toLowerCase()) {
    case 'product':
      return 'blue';
    case 'milestone':
      return 'green';
    case 'learning':
      return 'purple';
    default:
      return 'gray';
  }
} 