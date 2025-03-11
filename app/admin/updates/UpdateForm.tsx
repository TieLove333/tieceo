'use client';

import { useState, useEffect } from 'react';
import { createUpdate, updateUpdate } from '../../lib/supabase';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  useToast,
  Textarea,
  HStack,
  IconButton,
  Tooltip,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { 
  BiBold, 
  BiItalic, 
  BiCode, 
  BiLink, 
  BiCodeBlock,
  BiVideo,
  BiLogoTwitter
} from 'react-icons/bi';
import { GoQuote } from 'react-icons/go';

// Define types
interface Update {
  id: number;
  title: string;
  content: string;
  category: string;
  publish_date?: string;
  created_at: string;
  updated_at: string;
}

interface UpdateFormProps {
  onUpdateAdded?: (update: Update) => void;
  updateToEdit?: Update | null;
  onUpdateEdited?: (update: Update) => void;
  onCancelEdit?: () => void;
}

export default function UpdateForm({ 
  onUpdateAdded, 
  updateToEdit = null, 
  onUpdateEdited,
  onCancelEdit
}: UpdateFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [embedUrl, setEmbedUrl] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Load update data if in edit mode
  useEffect(() => {
    if (updateToEdit) {
      setTitle(updateToEdit.title);
      setContent(updateToEdit.content);
      setCategory(updateToEdit.category.toLowerCase());
      setUpdateId(updateToEdit.id);
      setEditMode(true);
      if (updateToEdit.publish_date) {
        setPublishDate(updateToEdit.publish_date);
      }
    } else {
      resetForm();
      setEditMode(false);
      setUpdateId(null);
    }
  }, [updateToEdit]);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategory('general');
    setPublishDate(new Date().toISOString().split('T')[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (editMode && updateId) {
        // Update existing update
        const { data, error } = await updateUpdate(updateId, {
          title,
          content,
          category,
          publishDate
        });
        
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
            description: 'Update edited successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          
          // Notify parent component
          if (onUpdateEdited && data && data[0]) {
            onUpdateEdited(data[0]);
          }
          
          // Reset form and exit edit mode
          resetForm();
          setEditMode(false);
          setUpdateId(null);
        }
      } else {
        // Create new update
        const { data, error } = await createUpdate(
          title, 
          content, 
          category, 
          publishDate
        );
        
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
          resetForm();
          
          // Notify parent component
          if (onUpdateAdded && data && data[0]) {
            onUpdateAdded(data[0]);
          }
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

  const handleCancel = () => {
    resetForm();
    setEditMode(false);
    setUpdateId(null);
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const insertAtCursor = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newContent = 
      content.substring(0, start) + 
      before + 
      selectedText + 
      after + 
      content.substring(end);
    
    setContent(newContent);
  };

  const handleFormat = (type: string) => {
    switch (type) {
      case 'bold':
        insertAtCursor('**', '**');
        break;
      case 'italic':
        insertAtCursor('_', '_');
        break;
      case 'code':
        insertAtCursor('`', '`');
        break;
      case 'codeblock':
        insertAtCursor('\n```\n', '\n```\n');
        break;
      case 'quote':
        insertAtCursor('> ');
        break;
      case 'link':
        insertAtCursor('[', '](url)');
        break;
    }
  };

  const handleEmbed = () => {
    if (!embedUrl) return;
    
    let embedCode = '';
    
    if (embedUrl.includes('twitter.com') || embedUrl.includes('x.com')) {
      // Note: Make sure to add <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      // to the main layout or page where tweets will be rendered
      embedCode = `<blockquote class="twitter-tweet">
  <a href="${embedUrl}"></a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`;
    } else if (embedUrl.includes('youtube.com') || embedUrl.includes('youtu.be')) {
      const videoId = embedUrl.includes('youtu.be') 
        ? embedUrl.split('/').pop() 
        : new URLSearchParams(new URL(embedUrl).search).get('v');
      embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
    
    if (embedCode) {
      insertAtCursor('\n' + embedCode + '\n');
      setEmbedUrl('');
      onClose();
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
      <Heading size="md" mb={4}>{editMode ? 'Edit Update' : 'Post New Update'}</Heading>
      
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
          
          <HStack spacing={4}>
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
              <FormLabel>Publish Date</FormLabel>
              <Input
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
              />
            </FormControl>
          </HStack>
          
          <FormControl isRequired>
            <FormLabel>Content</FormLabel>
            <ButtonGroup size="sm" mb={2} spacing={1}>
              <Tooltip label="Bold">
                <IconButton
                  aria-label="Bold"
                  icon={<BiBold />}
                  onClick={() => handleFormat('bold')}
                />
              </Tooltip>
              <Tooltip label="Italic">
                <IconButton
                  aria-label="Italic"
                  icon={<BiItalic />}
                  onClick={() => handleFormat('italic')}
                />
              </Tooltip>
              <Tooltip label="Inline Code">
                <IconButton
                  aria-label="Code"
                  icon={<BiCode />}
                  onClick={() => handleFormat('code')}
                />
              </Tooltip>
              <Tooltip label="Link">
                <IconButton
                  aria-label="Link"
                  icon={<BiLink />}
                  onClick={() => handleFormat('link')}
                />
              </Tooltip>
              <Divider orientation="vertical" />
              <Tooltip label="Code Block">
                <IconButton
                  aria-label="Code Block"
                  icon={<BiCodeBlock />}
                  onClick={() => handleFormat('codeblock')}
                />
              </Tooltip>
              <Tooltip label="Quote">
                <IconButton
                  aria-label="Quote"
                  icon={<GoQuote />}
                  onClick={() => handleFormat('quote')}
                />
              </Tooltip>
              <Divider orientation="vertical" />
              <Tooltip label="Embed Tweet/Video">
                <IconButton
                  aria-label="Embed"
                  icon={<HStack spacing={0}><BiLogoTwitter /><BiVideo /></HStack>}
                  onClick={onOpen}
                />
              </Tooltip>
            </ButtonGroup>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your update content here... Use the toolbar above for formatting."
              size="lg"
              minH="200px"
              resize="vertical"
              fontFamily="mono"
            />
          </FormControl>
          
          <HStack spacing={4} justify="flex-end">
            {editMode && (
              <Button
                variant="ghost"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            )}
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={isSubmitting}
            >
              {editMode ? 'Save Changes' : 'Publish Update'}
            </Button>
          </HStack>
        </VStack>
      </form>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Embed Content</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>URL</FormLabel>
                <Input
                  value={embedUrl}
                  onChange={(e) => setEmbedUrl(e.target.value)}
                  placeholder="Paste Twitter/X or YouTube URL"
                />
              </FormControl>
              <Button onClick={handleEmbed} colorScheme="blue" width="full">
                Insert Embed
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
} 