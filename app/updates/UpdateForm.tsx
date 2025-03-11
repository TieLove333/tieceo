'use client';

import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { createUpdate } from '../lib/supabase';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';

// Define types
interface Update {
  id: number;
  title: string;
  content: string;
  category: string;
  created_at: string;
}

interface UpdateFormProps {
  onUpdateAdded?: (update: Update) => void;
}

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function UpdateForm({ onUpdateAdded }: UpdateFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await createUpdate(title, content, category);
      
      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Success',
          description: 'Update published successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        
        // Clear form
        setTitle('');
        setContent('');
        setCategory('general');
        
        // Notify parent component
        if (onUpdateAdded && data && data[0]) {
          onUpdateAdded(data[0]);
        }
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="xl"
      boxShadow="sm"
      mb={6}
    >
      <Heading size="md" mb={4}>Post New Update</Heading>
      
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter update title"
            />
          </FormControl>
          
          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="general">General</option>
              <option value="product">Product</option>
              <option value="milestone">Milestone</option>
              <option value="learning">Learning</option>
            </Select>
          </FormControl>
          
          <FormControl isRequired>
            <FormLabel>Content</FormLabel>
            <Box h="250px" mb={2}>
              <ReactQuill
                value={content}
                onChange={setContent}
                style={{ height: "200px" }}
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    ['link', 'image'],
                    ['clean']
                  ],
                }}
              />
            </Box>
          </FormControl>
          
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={isSubmitting}
            alignSelf="flex-end"
          >
            Publish Update
          </Button>
        </VStack>
      </form>
    </Box>
  );
} 