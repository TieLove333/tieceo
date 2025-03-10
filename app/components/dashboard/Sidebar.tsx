'use client';

import React from 'react';
import {
  Box,
  VStack,
  Icon,
  Text,
  Flex,
  Heading,
  Divider,
  Button,
  HStack
} from '@chakra-ui/react';
import {
  FaHome,
  FaUser,
  FaChartPie,
  FaVideo,
  FaSync,
  FaQuestionCircle
} from 'react-icons/fa';
import Link from 'next/link';

export function Sidebar() {
  const dashboardItems = [
    { label: 'Home', icon: FaHome, href: '/', active: true },
    { label: 'Analytics', icon: FaChartPie, href: '/dashboard' },
    { label: 'Profile', icon: FaUser, href: '/profile' },
    { label: 'Live Stream', icon: FaVideo, href: '/livestream' },
    { label: 'Updates', icon: FaSync, href: '/updates' }
  ];

  return (
    <Box
      width="280px"
      bg="white"
      height="98vh"
      position="fixed"
      top="10px"
      left="10px"
      borderRadius="20px"
      boxShadow="sm"
      p="6"
      overflowY="auto"
    >
      {/* Logo Section */}
      <Flex 
        alignItems="center" 
        justifyContent="flex-start" 
        mb="8"
      >
        <Icon as={FaHome} boxSize="6" mr="3" color="gray.700" />
        <Heading 
          size="md" 
          color="gray.800"
          fontWeight="bold"
        >
          PURITY UI DASHBOARD
        </Heading>
      </Flex>

      {/* Dashboard Items */}
      <VStack spacing="4" align="stretch" mb="8">
        {dashboardItems.map((item, index) => (
          <Flex 
            key={index}
            as={Link}
            href={item.href}
            alignItems="center" 
            color={item.active ? "teal.400" : "gray.400"}
            p="3"
            borderRadius="md"
            bg={item.active ? "teal.50" : "transparent"}
            cursor="pointer"
            _hover={{ 
              bg: item.active ? "teal.50" : "gray.50",
              color: item.active ? "teal.400" : "gray.700"
            }}
          >
            <Box 
              bg={item.active ? "teal.400" : "transparent"}
              p={item.active ? "2" : "0"}
              borderRadius="md"
              mr="3"
            >
              <Icon 
                as={item.icon} 
                color={item.active ? "white" : "gray.400"} 
                boxSize={item.active ? "4" : "5"}
              />
            </Box>
            <Text fontWeight={item.active ? "medium" : "normal"}>
              {item.label}
            </Text>
          </Flex>
        ))}
      </VStack>

      {/* Help Box */}
      <Box
        bg="teal.400"
        borderRadius="xl"
        p="5"
        color="white"
        mt="auto"
      >
        <Flex
          bg="white"
          w="10"
          h="10"
          borderRadius="full"
          alignItems="center"
          justifyContent="center"
          mb="3"
        >
          <Icon as={FaQuestionCircle} color="teal.400" boxSize="5" />
        </Flex>
        <Heading size="sm" mb="1">Need help?</Heading>
        <Text fontSize="sm" mb="4">Please check our docs</Text>
        <Button
          bg="white"
          color="black"
          size="sm"
          w="full"
          borderRadius="lg"
          fontWeight="bold"
        >
          DOCUMENTATION
        </Button>
      </Box>
    </Box>
  );
}

export default Sidebar; 