'use client';

import { useState, useRef, useEffect } from 'react';
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
import { Textarea } from "../../src/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../src/components/ui/tabs";
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
  const [activeTab, setActiveTab] = useState("visual");
  const [htmlContent, setHtmlContent] = useState("");
  const quillRef = useRef(null);

  // Configure Quill to allow HTML content
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['clean']
    ],
    clipboard: {
      // Allow pasting HTML content
      matchVisual: false
    }
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image', 'video',
    'align', 'blockquote', 'code-block'
  ];

  const form = useForm({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      title: '',
      content: '',
      category: 'General'
    }
  });

  // Sync content between visual editor and HTML editor
  useEffect(() => {
    if (activeTab === "code") {
      setHtmlContent(form.getValues().content || "");
    }
  }, [activeTab, form]);

  // Handle tab change
  const handleTabChange = (value) => {
    if (value === "code" && activeTab === "visual") {
      // Switching from visual to code
      setHtmlContent(form.getValues().content || "");
    } else if (value === "visual" && activeTab === "code") {
      // Switching from code to visual
      form.setValue("content", htmlContent, { shouldValidate: true });
    }
    setActiveTab(value);
  };

  // Handle HTML content change
  const handleHtmlChange = (e) => {
    setHtmlContent(e.target.value);
    form.setValue("content", e.target.value, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Ensure we're sending the raw HTML content
      const contentToSend = activeTab === "code" ? htmlContent : data.content;
      
      const response = await fetch('/api/updates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          content: contentToSend
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create update');
      }

      const newUpdate = await response.json();
      
      // Reset form
      form.reset();
      setHtmlContent("");
      
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
                    <div className="w-full">
                      <div className="flex border-b mb-4">
                        <button
                          type="button"
                          onClick={() => handleTabChange("visual")}
                          className={`px-4 py-2 ${activeTab === "visual" 
                            ? "border-b-2 border-slate-700 font-medium" 
                            : "text-slate-500"}`}
                        >
                          Visual Editor
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTabChange("code")}
                          className={`px-4 py-2 ${activeTab === "code" 
                            ? "border-b-2 border-slate-700 font-medium" 
                            : "text-slate-500"}`}
                        >
                          HTML Code
                        </button>
                      </div>
                      
                      {activeTab === "visual" ? (
                        <div className="border rounded-md border-slate-300 shadow-sm focus-within:ring-2 focus-within:ring-slate-500 focus-within:border-transparent">
                          <ReactQuill
                            ref={quillRef}
                            theme="snow"
                            value={field.value}
                            onChange={field.onChange}
                            modules={quillModules}
                            formats={quillFormats}
                            placeholder="Write your update here..."
                            className="rounded-md" 
                            readOnly={isSubmitting}
                            preserveWhitespace={true}
                          />
                        </div>
                      ) : (
                        <Textarea
                          value={htmlContent}
                          onChange={handleHtmlChange}
                          placeholder="Enter HTML content here, including embed codes..."
                          className="font-mono min-h-[300px] p-4"
                          readOnly={isSubmitting}
                        />
                      )}
                    </div>
                  </FormControl>
                  <div className="mt-2 text-sm text-slate-500">
                    Tip: Switch to HTML Code view to paste embed codes like Twitter embeds.
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="form-button-enhanced update-form-button"
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