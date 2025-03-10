'use client';

import React from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
  VStack,
  Link as ChakraLink
} from '@chakra-ui/react';
import { 
  FaChartLine, 
  FaVideo, 
  FaSync,
  FaArrowRight
} from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  const bentoItems = [
    { 
      label: 'Analytics', 
      description: 'Dive deep into my SaaS metrics',
      icon: FaChartLine, 
      href: '/dashboard',
      color: 'gray.500'
    },
    { 
      label: 'Live Stream', 
      description: 'Real-time coding & startup insights',
      icon: FaVideo, 
      href: '/livestream',
      color: 'gray.500'
    },
    { 
      label: 'Updates', 
      description: 'Latest progress on my $1B journey',
      icon: FaSync, 
      href: '/updates',
      color: 'gray.500'
    }
  ];

  return (
    <Box>
      {/* Headline Section */}
      <Box 
        bg="gray.800" 
        borderRadius="xl" 
        boxShadow="sm" 
        p="8" 
        mb="6" 
        textAlign="center"
        minHeight="43vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Heading 
          size="2xl" 
          color="white" 
          mb="4"
          fontWeight="bold"
          maxW="800px"
        >
          Building A $1B Solo SaaS Empire with Just Me + AI
        </Heading>
        <Text 
          color="whiteAlpha.800" 
          fontSize="xl" 
          maxW="800px" 
          mx="auto"
        >
          Follow the epic journey in public. Updated constantly.
        </Text>
      </Box>

      {/* Bento Box Grid */}
      <SimpleGrid columns={3} spacing="6">
        {bentoItems.map((item, index) => (
          <ChakraLink 
            as={Link} 
            href={item.href} 
            key={index}
            _hover={{ textDecoration: 'none' }}
          >
            <Card 
              bg="white" 
              borderRadius="xl" 
              boxShadow="sm"
              transition="all 0.3s"
              _hover={{
                transform: 'translateY(-5px)',
                boxShadow: 'md'
              }}
            >
              <CardBody>
                <Flex alignItems="center" justifyContent="space-between">
                  <VStack align="start" spacing="2">
                    <Flex alignItems="center">
                      <Icon 
                        as={item.icon} 
                        color={item.color} 
                        boxSize="6" 
                        mr="3" 
                      />
                      <Heading size="md" color="gray.700">
                        {item.label}
                      </Heading>
                    </Flex>
                    <Text color="gray.500" fontSize="sm">
                      {item.description}
                    </Text>
                  </VStack>
                  <Icon 
                    as={FaArrowRight} 
                    color="gray.400" 
                    boxSize="5" 
                  />
                </Flex>
              </CardBody>
            </Card>
          </ChakraLink>
        ))}
      </SimpleGrid>
    </Box>
  );
} 