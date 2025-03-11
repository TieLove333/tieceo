'use client';

import React, { useState, useEffect } from 'react';
import { getUpdates, deleteUpdate } from '../../lib/supabase';
import { getCurrentUser } from '../../lib/supabase';
import UpdateForm from './UpdateForm';
import {
  Container,
  Box,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Badge,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Divider,
} from '@chakra-ui/react';

interface Update {
  id: number;
  title: string;
  content: string;
  category: string;
  publish_date?: string;
  created_at: string;
  updated_at: string;
}

// API function to sync the database schema
async function syncDatabaseSchema() {
  try {
    const response = await fetch('/api/db/sync');
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to sync database');
    }
    
    return { success: true, message: data.message };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, message: errorMessage };
  }
}

// API function to directly fix database issues
async function directDatabaseFix() {
  try {
    const response = await fetch('/api/db/direct-fix');
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fix database');
    }
    
    return { success: true, message: data.message };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, message: errorMessage };
  }
}

// API function to completely rebuild the database table
async function rebuildDatabase() {
  try {
    const response = await fetch('/api/db/rebuild');
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to rebuild database');
    }
    
    return { success: true, message: data.message, dataRestored: data.dataRestored };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, message: errorMessage };
  }
}

export default function AdminUpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<'sync' | 'fix' | 'rebuild' | 'delete' | ''>('');
  const [updateToEdit, setUpdateToEdit] = useState<Update | null>(null);
  const [updateToDelete, setUpdateToDelete] = useState<Update | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();
  const toast = useToast();

  useEffect(() => {
    async function initializeApp() {
      try {
        setLoading(true);
        
        // Check authentication
        await checkUser();
        
        // Sync database schema
        const syncResult = await syncDatabaseSchema();
        if (!syncResult.success) {
          toast({
            title: 'Database Sync Failed',
            description: syncResult.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } else {
          console.log('Database sync completed:', syncResult.message);
        }
        
        // Fetch updates
        await fetchUpdates();
      } catch (error) {
        console.error('Error initializing app:', error);
        toast({
          title: 'Initialization Error',
          description: 'There was a problem loading the application. Please refresh the page.',
          status: 'error',
          duration: 7000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    }
    
    initializeApp();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Exception checking user:', error);
      toast({
        title: 'Authentication Error',
        description: 'There was a problem verifying your login. Please try signing in again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setUser(null);
    }
  };

  const fetchUpdates = async () => {
    try {
      setLoading(true);

      const { data, error } = await getUpdates();
      
      if (error) {
        console.error('Error fetching updates:', error);
        
        toast({
          title: 'Error fetching updates',
          description: error.message || 'There was a problem loading your updates. Try using the database fix options below.',
          status: 'error',
          duration: 7000,
          isClosable: true,
        });
        
        // Still set empty updates to prevent undefined errors
        setUpdates([]);
      } else {
        setUpdates(data || []);
      }
    } catch (error) {
      console.error('Exception fetching updates:', error);
      
      toast({
        title: 'Error',
        description: 'There was a problem loading your updates. Try using the database fix options below.',
        status: 'error',
        duration: 7000,
        isClosable: true,
      });
      
      // Set empty updates to prevent undefined errors
      setUpdates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAdded = (newUpdate: Update) => {
    setUpdates([newUpdate, ...updates]);
  };

  const handleUpdateEdited = (editedUpdate: Update) => {
    setUpdates(updates.map(update => 
      update.id === editedUpdate.id ? editedUpdate : update
    ));
    setUpdateToEdit(null);
  };

  const handleCancelEdit = () => {
    setUpdateToEdit(null);
  };

  const handleManualSync = async () => {
    try {
      setLoading(true);
      setAction('sync');
      const syncResult = await syncDatabaseSchema();
      
      toast({
        title: syncResult.success ? 'Database Sync Complete' : 'Database Sync Failed',
        description: syncResult.message,
        status: syncResult.success ? 'success' : 'error',
        duration: 5000,
        isClosable: true,
      });
      
      if (syncResult.success) {
        // Reload updates if sync was successful
        await fetchUpdates();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sync database',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      setAction('');
    }
  };

  const handleDirectFix = async () => {
    try {
      setLoading(true);
      setAction('fix');
      const fixResult = await directDatabaseFix();
      
      toast({
        title: fixResult.success ? 'Database Fix Complete' : 'Database Fix Failed',
        description: fixResult.message,
        status: fixResult.success ? 'success' : 'error',
        duration: 5000,
        isClosable: true,
      });
      
      if (fixResult.success) {
        // Reload updates if fix was successful
        await fetchUpdates();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fix database',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      setAction('');
    }
  };

  const handleRebuild = async () => {
    const confirmRebuild = window.confirm(
      'WARNING: This will completely rebuild the database table. ' +
      'We will try to preserve your data, but there is a risk of data loss. ' +
      'Are you sure you want to continue?'
    );
    
    if (!confirmRebuild) {
      return;
    }
    
    try {
      setLoading(true);
      setAction('rebuild');
      const rebuildResult = await rebuildDatabase();
      
      toast({
        title: rebuildResult.success ? 'Database Rebuild Complete' : 'Database Rebuild Failed',
        description: rebuildResult.success 
          ? `${rebuildResult.message}. ${rebuildResult.dataRestored} records restored.`
          : rebuildResult.message,
        status: rebuildResult.success ? 'success' : 'error',
        duration: 5000,
        isClosable: true,
      });
      
      if (rebuildResult.success) {
        // Reload updates if rebuild was successful
        await fetchUpdates();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to rebuild database',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      setAction('');
    }
  };

  const handleDeleteClick = (update: Update) => {
    setUpdateToDelete(update);
    onOpen();
  };

  const handleDeleteConfirm = async () => {
    if (!updateToDelete) return;
    
    try {
      const { error } = await deleteUpdate(updateToDelete.id);
      
      if (error) {
        toast({
          title: 'Error',
          description: `Failed to delete update: ${error.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        setUpdates(updates.filter(update => update.id !== updateToDelete.id));
        toast({
          title: 'Success',
          description: 'Update deleted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error('Error deleting update:', err);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setUpdateToDelete(null);
      onClose();
    }
  };

  if (loading) {
    return (
      <Container maxW="container.xl" py={12}>
        <Spinner size="lg" />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxW="container.xl" py={12}>
        <Alert status="warning">
          <AlertIcon />
          You need to be logged in to access this page.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={12}>
      <Heading as="h1" size="xl" mb={2}>
        Manage Updates
      </Heading>
      <Text mb={8}>
        Create and publish updates about your $1B solo SaaS journey.
      </Text>

      <Box mb={8}>
        <Heading as="h1" size="xl" mb={6}>
          Manage Updates
        </Heading>
        
        <UpdateForm 
          onUpdateAdded={handleUpdateAdded} 
          updateToEdit={updateToEdit}
          onUpdateEdited={handleUpdateEdited}
          onCancelEdit={handleCancelEdit}
        />
      </Box>
      
      <Box mb={4}>
        <Heading as="h2" size="lg" mb={4}>
          Your Updates
        </Heading>
        
        <Box mb={4}>
          <Heading as="h3" size="md" mb={2}>
            Database Management
          </Heading>
          <Text fontSize="sm" color="gray.600" mb={3}>
            If you're having issues with the database, try these options:
          </Text>
          
          <Alert status="info" mb={4} borderRadius="md">
            <AlertIcon />
            <Box>
              <Text fontWeight="bold">Seeing database errors?</Text>
              <Text fontSize="sm">
                1. Try "Sync Database" first - safely adds missing columns<br />
                2. If that fails, try "Direct Database Fix" - uses SQL to modify the structure<br />
                3. As a last resort, use "Rebuild Database" - recreates the table structure
              </Text>
            </Box>
          </Alert>
          
          <HStack spacing={4}>
            <Button 
              colorScheme="teal" 
              size="sm" 
              onClick={handleManualSync}
              isLoading={loading && action === 'sync'}
              loadingText="Syncing..."
              leftIcon={<span role="img" aria-label="sync">🔄</span>}
            >
              Sync Database
            </Button>
            
            <Button 
              colorScheme="blue" 
              size="sm" 
              onClick={handleDirectFix}
              isLoading={loading && action === 'fix'}
              loadingText="Fixing..."
              leftIcon={<span role="img" aria-label="fix">🔧</span>}
            >
              Direct Database Fix
            </Button>
            
            <Button 
              colorScheme="red" 
              size="sm" 
              onClick={handleRebuild}
              isLoading={loading && action === 'rebuild'}
              loadingText="Rebuilding..."
              leftIcon={<span role="img" aria-label="rebuild">⚠️</span>}
            >
              Rebuild Database
            </Button>
          </HStack>
        </Box>
      </Box>

      <Box overflowX="auto">
        {updates.length === 0 ? (
          <Alert status="info">
            <AlertIcon />
            No updates yet. Create your first update above!
          </Alert>
        ) : (
          <Table variant="simple" size="md">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Publish Date</Th>
                <Th>Created</Th>
                <Th>Updated</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {updates.map((update) => (
                <Tr key={update.id}>
                  <Td fontWeight="medium">{update.title}</Td>
                  <Td>
                    <Badge 
                      colorScheme={getCategoryColor(update.category)}
                    >
                      {update.category}
                    </Badge>
                  </Td>
                  <Td>{update.publish_date ? new Date(update.publish_date).toLocaleDateString() : '-'}</Td>
                  <Td>{new Date(update.created_at).toLocaleDateString()}</Td>
                  <Td>{new Date(update.updated_at).toLocaleDateString()}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button 
                        size="sm" 
                        colorScheme="blue" 
                        variant="outline"
                        onClick={() => setUpdateToEdit(update)}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        colorScheme="red" 
                        variant="outline" 
                        onClick={() => handleDeleteClick(update)}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Update
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete "{updateToDelete?.title}"? 
              This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
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