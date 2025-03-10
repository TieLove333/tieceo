'use client';

import React from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  HStack,
  Avatar,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Icon,
  Link,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { 
  FaCode, 
  FaGlobe,
  FaTwitter, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaSearch,
  FaCog,
  FaBell
} from 'react-icons/fa';

export default function ProfilePage() {
  const projects = [
    {
      name: 'Tie.ceo',
      description: 'Solo SaaS Challenge Platform',
      link: 'https://tie.ceo'
    },
    {
      name: 'Capsole.io',
      description: 'AI-Powered Development Tools',
      link: 'https://capsole.io'
    },
    {
      name: 'SoloQuest.fun',
      description: 'Indie Maker Community Platform',
      link: 'https://soloquest.fun'
    }
  ];

  return (
    <Box>
      {/* Top Gradient Section */}
      <Box 
        position="relative" 
        h="250px" 
        bg="linear-gradient(135deg, #2D3748, #1A202C)"
        overflow="hidden"
      >
        {/* Gradient Overlay Pattern */}
        <Box 
          position="absolute" 
          top="0" 
          left="0" 
          right="0" 
          bottom="0" 
          opacity="0.2"
          backgroundImage="linear-gradient(135deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1))"
          backgroundSize="40px 40px"
        />

        {/* Top Bar */}
        <Flex 
          position="absolute" 
          top="0" 
          left="0" 
          right="0" 
          p="4" 
          alignItems="center"
          justifyContent="space-between"
        >
          <Text color="white" fontSize="xl" fontWeight="bold">
            Pages / Profile
          </Text>
          <Flex alignItems="center">
            <InputGroup mr="4" maxW="250px">
              <InputLeftElement pointerEvents="none">
                <Icon as={FaSearch} color="gray.400" />
              </InputLeftElement>
              <Input 
                type="text" 
                placeholder="Type here..." 
                bg="whiteAlpha.200" 
                color="white"
                borderColor="whiteAlpha.300"
                _placeholder={{ color: 'whiteAlpha.500' }}
              />
            </InputGroup>
            <HStack spacing="3">
              <Icon as={FaCog} color="gray.300" boxSize="5" cursor="pointer" />
              <Icon as={FaBell} color="gray.300" boxSize="5" cursor="pointer" />
              <Button 
                variant="solid" 
                bg="white" 
                color="gray.700" 
                size="sm"
              >
                Sign In
              </Button>
            </HStack>
          </Flex>
        </Flex>

        {/* Profile Header Content */}
        <Flex 
          position="absolute" 
          bottom="0" 
          left="0" 
          right="0" 
          p="6" 
          alignItems="flex-end"
        >
          <Avatar 
            size="2xl" 
            name="Tie" 
            src="/path/to/profile-image.jpg"
            border="4px solid white"
            boxShadow="lg"
          />
          <VStack 
            ml="6" 
            alignItems="flex-start" 
            color="white" 
            spacing="1"
          >
            <Heading size="lg">Tie</Heading>
            <Text>tie@tie.ceo</Text>
          </VStack>
          <Flex ml="auto" alignItems="center">
            <Button 
              variant="outline" 
              color="white" 
              borderColor="whiteAlpha.400" 
              mr="3"
            >
              OVERVIEW
            </Button>
            <Button 
              variant="solid" 
              bg="white" 
              color="gray.600"
            >
              PROJECTS
            </Button>
          </Flex>
        </Flex>
      </Box>

      {/* Rest of the Profile Content */}
      <Box mt="20">
        {/* About Tie Section (Full Width) */}
        <Card bg="white" borderRadius="xl" boxShadow="sm" mb="6">
          <CardHeader>
            <Heading size="md" color="gray.700">About Tie</Heading>
          </CardHeader>
          <CardBody>
            <Text color="gray.500" mb="4">
              Hi, I'm Tie, a passionate indie hacker building multiple SaaS products. 
              My mission is to create innovative solutions that solve real-world problems. 
              I believe in the power of solo entrepreneurship and continuous learning.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              <HStack>
                <Icon as={FaMapMarkerAlt} color="gray.500" />
                <Text color="gray.500">Las Vegas, NV</Text>
              </HStack>
              <HStack>
                <Icon as={FaEnvelope} color="gray.500" />
                <Text color="gray.500">tie@tie.ceo</Text>
              </HStack>
              <HStack>
                <Icon as={FaTwitter} color="gray.500" />
                <Text color="gray.500">@tielove333</Text>
              </HStack>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Projects Section */}
        <Card bg="white" borderRadius="xl" boxShadow="sm">
          <CardHeader>
            <Heading size="md" color="gray.700">Projects</Heading>
            <Text color="gray.500" fontSize="sm">My Solo SaaS Journey</Text>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
              {projects.map((project, index) => (
                <Box 
                  key={index} 
                  bg="gray.50"
                  p="4"
                  borderRadius="xl" 
                  boxShadow="sm"
                  transition="all 0.2s"
                  _hover={{ 
                    transform: 'translateY(-5px)', 
                    boxShadow: 'md' 
                  }}
                >
                  <Flex alignItems="center" mb="3">
                    <Icon as={FaCode} mr="3" color="gray.500" />
                    <Heading size="sm" color="gray.700">
                      {project.name}
                    </Heading>
                  </Flex>
                  <Text color="gray.500" fontSize="sm" mb="3">
                    {project.description}
                  </Text>
                  <Flex alignItems="center" color="gray.500">
                    <Icon as={FaGlobe} mr="2" />
                    <Link href={project.link} isExternal fontSize="xs">
                      {project.link}
                    </Link>
                  </Flex>
                </Box>
              ))}
             
            </SimpleGrid>
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
} 