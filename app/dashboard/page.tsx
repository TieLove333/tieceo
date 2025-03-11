'use client';

import React from 'react';
import { StatsCard } from '../components/dashboard/StatsCard';
import useStripeDashboardMetrics from '../hooks/useStripeDashboardMetrics';
import {
  Box,
  Flex,
  Text,
  Icon,
  SimpleGrid,
  Grid,
  GridItem,
  Stack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Link,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Divider,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { FiSearch, FiSettings } from 'react-icons/fi';

export default function DashboardScreen() {
  const { stats, isLoading, error } = useStripeDashboardMetrics();

  return (
    <Box px="6" py="6" maxW="1400px" mx="auto">
      {/* Dashboard Header */}
      <Flex justifyContent="space-between" alignItems="center" mb="8">
        <Box>
          <Flex gap="1" fontSize="sm" color="gray.400">
            <Text>Pages</Text>
            <Text>/</Text>
            <Text>Dashboard</Text>
          </Flex>
          <Heading size="md" fontWeight="bold" color="gray.700">Dashboard</Heading>
        </Box>

        <Flex alignItems="center" gap="4">
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={FiSearch} color='gray.400' />
            </InputLeftElement>
            <Input 
              type="text" 
              placeholder="Type here..." 
              size="md" 
              fontSize="sm"
              borderRadius="xl" 
              borderColor="gray.100"
              _focus={{ borderColor: 'teal.500', boxShadow: 'none' }}
            />
          </InputGroup>

          <Button 
            leftIcon={<FiSettings />} 
            variant="outline" 
            size="md" 
            borderRadius="xl"
            borderColor="gray.100"
            fontSize="sm"
          >
            Sign In
          </Button>
        </Flex>
      </Flex>

      {/* Stats Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="6" mb="8">
        {isLoading ? (
          <Center gridColumn="span 4" py="10">
            <Spinner size="xl" color="teal.500" />
          </Center>
        ) : error ? (
          <Center gridColumn="span 4" py="10">
            <Text color="red.500">Error loading stats: {error}</Text>
          </Center>
        ) : stats ? (
          <>
            <StatsCard
              title="ARR"
              value={stats.arr.value.toString()}
              change={`+${stats.arr.change}%`}
              changeType="positive"
              icon="https://cdn.builder.io/api/v1/image/assets/e63775f9de4343d8b56711d7431bf688/1caf4309851a0b56d049680bdc81be931d56e3dca647502f336a37db7d0958e6"
            />
            <StatsCard
              title="MRR"
              value={stats.mrr.value.toString()}
              change={`+${stats.mrr.change}%`}
              changeType="positive"
              icon="https://cdn.builder.io/api/v1/image/assets/e63775f9de4343d8b56711d7431bf688/1caf4309851a0b56d049680bdc81be931d56e3dca647502f336a37db7d0958e6"
            />
            <StatsCard
              title="Users"
              value={stats.users.value.toString()}
              change={`+${stats.users.change}%`}
              changeType="positive"
              icon="https://cdn.builder.io/api/v1/image/assets/e63775f9de4343d8b56711d7431bf688/8cfd6c6960f0f165603a6d252024f101ff8c38db66be60e10436907aa7315cf5"
            />
            <StatsCard
              title="Total Sales"
              value={stats.sales.value.toString()}
              change={`+${stats.sales.change}%`}
              changeType="positive"
              icon="https://cdn.builder.io/api/v1/image/assets/e63775f9de4343d8b56711d7431bf688/6c4a1e94de0ca4233b8b72d47ce4a90e2f705f43fbaa395777d18279ee229480"
            />
          </>
        ) : (
          <>
            <StatsCard
              title="Today's Money"
              value="$53,000"
              change="+55%"
              changeType="positive"
              icon="https://cdn.builder.io/api/v1/image/assets/e63775f9de4343d8b56711d7431bf688/1caf4309851a0b56d049680bdc81be931d56e3dca647502f336a37db7d0958e6"
            />
            <StatsCard
              title="Today's Users"
              value="2,300"
              change="+5%"
              changeType="positive"
              icon="https://cdn.builder.io/api/v1/image/assets/e63775f9de4343d8b56711d7431bf688/8cfd6c6960f0f165603a6d252024f101ff8c38db66be60e10436907aa7315cf5"
            />
            <StatsCard
              title="New Clients"
              value="+3,052"
              change="-14%"
              changeType="negative"
              icon="https://cdn.builder.io/api/v1/image/assets/e63775f9de4343d8b56711d7431bf688/54a8cd633b9237f9dbd4a34c8c25180887800ccdaa02149c03fe9eb88dce3882"
            />
            <StatsCard
              title="Total Sales"
              value="$173,000"
              change="+8%"
              changeType="positive"
              icon="https://cdn.builder.io/api/v1/image/assets/e63775f9de4343d8b56711d7431bf688/6c4a1e94de0ca4233b8b72d47ce4a90e2f705f43fbaa395777d18279ee229480"
            />
          </>
        )}
      </SimpleGrid>

      {/* Info Cards */}
      <Grid templateColumns={{ base: "1fr", lg: "3fr 2fr" }} gap="6" mb="8">
        <GridItem as={Box} p="6" bg="white" borderRadius="2xl" boxShadow="sm">
          <Stack spacing="3">
            <Text fontSize="xs" fontWeight="bold" color="gray.400">Building Mode</Text>
            <Heading size="md" color="gray.700">Building In Public</Heading>
            <Text fontSize="sm" color="gray.400">
              I'm currently building Capsole.io & SoloQuest.fun<br />
              and sharing all the progress along the way. It's more fun that way!
            </Text>
            <Flex 
              mt={{ base: "10", md: "36" }} 
              alignItems="center" 
              fontSize="xl" 
              color="gray.700"
              as="button"
            >
              Read more
              <Image 
                src="https://cdn.builder.io/api/v1/image/assets/e63775f9de4343d8b56711d7431bf688/54840c4803c6f1cb5eefcc84344eca07822dd4cb5be0fb31c69e80f4d6fbf4dc"
                alt=""
                w="3"
                h="3"
                ml="1.5"
              />
            </Flex>
          </Stack>
        </GridItem>

        <GridItem position="relative" borderRadius="2xl" overflow="hidden" boxShadow="sm">
          <Image 
            src="https://cdn.builder.io/api/v1/image/assets/e63775f9de4343d8b56711d7431bf688/fc6b17646f4fb5fb158ccf63c9ce76d9a3e86c9c4e49c579e84b8e069607c2f6"
            alt=""
            position="absolute"
            inset="0"
            w="full"
            h="full"
            objectFit="cover"
          />
          <Box position="relative" zIndex="1" p="8" color="white" fontWeight="bold">
            <Heading size="md">Build Your Moonshot</Heading>
            <Text mt="5" fontSize="sm">
              Discover, Innovate & Accelerate your startup and moonshot.<br />
              The Capsole moonshot platform launches soon!
            </Text>
            <Flex 
              mt={{ base: "10", md: "32" }} 
              alignItems="center" 
              fontSize="xl"
              as="button"
            >
              Read more
              <Image 
                src="https://cdn.builder.io/api/v1/image/assets/e63775f9de4343d8b56711d7431bf688/5f1166e6a38146e9c2c8dbd74156cf5b6fa0d5cc70bcd6ea32872afa88293612"
                alt=""
                w="3"
                h="3"
                ml="1.5"
              />
            </Flex>
          </Box>
        </GridItem>
      </Grid>

      {/* Chart Sections */}
      <Grid templateColumns={{ base: "1fr", lg: "3fr 2fr" }} gap="6" mb="8">
        <GridItem as={Box} p="6" bg="white" borderRadius="2xl" boxShadow="sm">
          <Heading size="sm" color="gray.700" mb="1">Active Users</Heading>
          <Text fontSize="sm" color="gray.400" mb="6">
            <Text as="span" color="green.500" fontWeight="medium">(+23%)</Text> than last week
          </Text>
          
          <Flex justifyContent="space-between" mb="8">
            <Stack alignItems="center">
              <Flex 
                w="10" 
                h="10" 
                bg="gray.100" 
                borderRadius="lg" 
                alignItems="center" 
                justifyContent="center"
              >
                <Image 
                  src="https://cdn.builder.io/api/v1/image/assets/e63775f9de4343d8b56711d7431bf688/73ea343a5048042b2351eb35003ab8de704284026eb9f51a17075e90e246d454"
                  w="5"
                  h="5"
                  alt=""
                />
              </Flex>
              <Text fontSize="xs" color="gray.400" mt="2">Users</Text>
              <Text fontWeight="bold" fontSize="xl">32,984</Text>
            </Stack>
            <Stack alignItems="center">
              <Flex 
                w="10" 
                h="10" 
                bg="gray.100" 
                borderRadius="lg" 
                alignItems="center" 
                justifyContent="center"
              >
                <Image 
                  src="https://cdn.builder.io/api/v1/image/assets/e63775f9de4343d8b56711d7431bf688/43aba798bc753a5f01a5e36816717e203a1920e1edc4d7ddec12247439cc58a1"
                  w="5"
                  h="5"
                  alt=""
                />
              </Flex>
              <Text fontSize="xs" color="gray.400" mt="2">Clicks</Text>
              <Text fontWeight="bold" fontSize="xl">2,42m</Text>
            </Stack>
            <Stack alignItems="center">
              <Flex 
                w="10" 
                h="10" 
                bg="gray.100" 
                borderRadius="lg" 
                alignItems="center" 
                justifyContent="center"
              >
                <Image 
                  src="https://cdn.builder.io/api/v1/image/assets/e63775f9de4343d8b56711d7431bf688/31885e0c4845d427fb0ad61b404c247e973a1a0460bbb89eda8734ab69124589"
                  w="5"
                  h="5"
                  alt=""
                />
              </Flex>
              <Text fontSize="xs" color="gray.400" mt="2">Sales</Text>
              <Text fontWeight="bold" fontSize="xl">2,400$</Text>
            </Stack>
            <Stack alignItems="center">
              <Flex 
                w="10" 
                h="10" 
                bg="gray.100" 
                borderRadius="lg" 
                alignItems="center" 
                justifyContent="center"
              >
                <Image 
                  src="https://cdn.builder.io/api/v1/image/assets/e63775f9de4343d8b56711d7431bf688/6c4a1e94de0ca4233b8b72d47ce4a90e2f705f43fbaa395777d18279ee229480"
                  w="5"
                  h="5"
                  alt=""
                />
              </Flex>
              <Text fontSize="xs" color="gray.400" mt="2">Items</Text>
              <Text fontWeight="bold" fontSize="xl">320</Text>
            </Stack>
          </Flex>
          
          <Box h="64" bg="gray.50" borderRadius="xl" />
        </GridItem>
        <GridItem as={Box} p="6" bg="white" borderRadius="2xl" boxShadow="sm">
          <Heading size="sm" color="gray.700" mb="1">Sales overview</Heading>
          <Text fontSize="sm" color="gray.400" mb="6">
            <Text as="span" color="green.500" fontWeight="medium">(+5%)</Text> more in 2021
          </Text>
          
          <Box h="64" bg="gray.50" borderRadius="xl" />
        </GridItem>
      </Grid>

      {/* Footer */}
      <Flex justifyContent="space-between" alignItems="center" fontSize="xs" color="gray.400" mt="12" pb="8">
        <Flex gap="1">
          2024, Made with by{" "}
          <Link href="https://x.com/tielove333" color="teal.500" isExternal>
            Tie
          </Link>
        </Flex>
        <Flex gap="6">
          <Link href="#" _hover={{ color: "teal.500" }} transition="colors 0.2s">About Us</Link>
          <Link href="#" _hover={{ color: "teal.500" }} transition="colors 0.2s">Blog</Link>
          <Link href="#" _hover={{ color: "teal.500" }} transition="colors 0.2s">License</Link>
        </Flex>
      </Flex>
    </Box>
  );
}