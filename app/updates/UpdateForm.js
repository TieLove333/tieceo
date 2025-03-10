'use client';

import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { Button } from '../../src/components/ui/button';
import { Select } from '../../src/components/ui/select';
import { Form, FormItem, FormLabel, FormControl } from '../../src/components/ui/form';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function UpdateForm({ onUpdateAdded }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newUpdate = {
      title,
      content,
      category,
      date: new Date().toISOString()
    };
    
    // Here you would typically send this to your API
    console.log('New update:', newUpdate);
    
    // Clear form
    setTitle('');
    setContent('');
    setCategory('general');
    
    // Notify parent component
    if (onUpdateAdded) {
      onUpdateAdded(newUpdate);
    }
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormItem>
        <FormLabel htmlFor="title">Title</FormLabel>
        <FormControl>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </FormControl>
      </FormItem>
      
      <FormItem>
        <FormLabel htmlFor="category">Category</FormLabel>
        <FormControl>
          <Select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="general">General</option>
            <option value="product">Product</option>
            <option value="milestone">Milestone</option>
            <option value="learning">Learning</option>
          </Select>
        </FormControl>
      </FormItem>
      
      <FormItem>
        <FormLabel htmlFor="content">Content</FormLabel>
        <FormControl>
          <div className="h-64">
            <ReactQuill
              value={content}
              onChange={setContent}
              className="h-full"
            />
          </div>
        </FormControl>
      </FormItem>
      
      <Button type="submit" className="mt-4">
        Publish Update
      </Button>
    </Form>
  );
} 