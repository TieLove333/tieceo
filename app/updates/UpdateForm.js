'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import 'react-quill/dist/quill.snow.css';

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormMessage 
} from "../../src/components/ui/form";
import { Input } from "../../src/components/ui/input";
import { Button } from "../../src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../src/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../../src/components/ui/card";

// Dynamically import Quill to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// Form validation schema
const updateSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  content: z.string().min(10, { message: "Content must be at least 10 characters" }),
  category: z.string().min(1, { message: "Please select a category" })
});

// Category options
const CATEGORIES = [
  { value: 'General', label: 'General' },
  { value: 'Product', label: 'Product' },
  { value: 'Development', label: 'Development' },
  { value: 'Business', label: 'Business' },
  { value: 'Milestone', label: 'Milestone' }
];

export default function UpdateForm({ onUpdateAdded }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      [{ 'align': [] }],
      ['clean']
    ]
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image',
    'align'
  ];

  const form = useForm({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      title: '',
      content: '',
      category: 'General'
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/updates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create update');
      }

      const newUpdate = await response.json();
      
      // Reset form
      form.reset();
      
      // Notify parent component
      if (onUpdateAdded) {
        onUpdateAdded(newUpdate);
      }
    } catch (err) {
      console.error(err);
      form.setError('root', { 
        message: err.message || 'Something went wrong'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="form-container-enhanced">
      <CardHeader className="form-header-enhanced">
        <CardTitle className="form-title-enhanced">Create New Update</CardTitle>
      </CardHeader>
      <CardContent className="form-content-enhanced">
        {form.formState.errors.root && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {form.formState.errors.root.message}
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            <div className="update-form-fields-container">
              <div style={{ width: '65%' }}>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormControl>
                        <Input 
                          placeholder="Title" 
                          {...field} 
                          className="form-input-enhanced"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div style={{ width: '35%' }}>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormControl>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="select-trigger-enhanced">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent className="select-content-enhanced">
                            {CATEGORIES.map((category) => (
                              <SelectItem 
                                key={category.value} 
                                value={category.value}
                                className="select-item-enhanced"
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="mb-8 update-form-content-field">
                  <FormControl>
                    <div className="border rounded-md border-slate-300 shadow-sm focus-within:ring-2 focus-within:ring-slate-500 focus-within:border-transparent">
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Write your update here..."
                        className="rounded-md" 
                        readOnly={isSubmitting}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="form-button-enhanced mt-8 update-form-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Posting...' : 'Post Update'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 