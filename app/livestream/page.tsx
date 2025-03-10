'use client';

import React from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  Image
} from '@chakra-ui/react';

export default function LiveStreamPage() {
  const pastStreams = [
    {
      title: 'Building AI SaaS MVP in 24 Hours',
      thumbnail: 'https://via.placeholder.com/350x200?text=Stream+1',
      date: 'June 15, 2023'
    },
    {
      title: 'Scaling to $10K MRR Strategies',
      thumbnail: 'https://via.placeholder.com/350x200?text=Stream+2',
      date: 'May 22, 2023'
    },
    {
      title: 'Live Coding: Tie.ceo Platform Updates',
      thumbnail: 'https://via.placeholder.com/350x200?text=Stream+3',
      date: 'April 10, 2023'
    }
  ];

  return (
    <Box>
      {/* Live Stream Section */}
      <Box 
        bg="white" 
        borderRadius="xl" 
        boxShadow="sm" 
        mb="6"
      >
        <Box 
          bg="gray.800" 
          height="600px" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          borderTopRadius="xl"
        >
          <Text color="white" fontSize="2xl">
            Live Stream Embed (Placeholder)
          </Text>
        </Box>
      </Box>

      {/* Past Streams Section */}
      <Box>
        <Heading 
          size="lg" 
          color="gray.700" 
          mb="6"
        >
          Past Streams
        </Heading>

        <SimpleGrid columns={3} spacing="6">
          {pastStreams.map((stream, index) => (
            <Card 
              key={index} 
              bg="white" 
              borderRadius="xl" 
              boxShadow="sm"
              overflow="hidden"
              transition="all 0.3s"
              _hover={{
                transform: 'translateY(-5px)',
                boxShadow: 'md'
              }}
            >
              <Image 
                src={stream.thumbnail} 
                alt={stream.title}
                objectFit="cover"
                width="100%"
                height="200px"
              />
              <CardBody>
                <VStack align="start" spacing="2">
                  <Heading size="md" color="gray.700">
                    {stream.title}
                  </Heading>
                  <Text color="gray.500" fontSize="sm">
                    {stream.date}
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
} 