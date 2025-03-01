'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "../../src/components/ui/form";
import { Input } from "../../src/components/ui/input";
import { Button } from "../../src/components/ui/button";

// Form validation schema
const loginSchema = z.object({
  password: z.string().min(1, { message: "Password is required" })
});

export default function AdminLogin({ onLogin }) {
  const [error, setError] = useState('');

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: ''
    }
  });

  const onSubmit = (data) => {
    // Simple hardcoded password
    if (data.password === 'tie') {
      localStorage.setItem('adminToken', 'true');
      onLogin(true);
    } else {
      setError('Invalid password');
      localStorage.removeItem('adminToken');
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="form-field-enhanced">
                <FormLabel className="form-label-enhanced">Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Enter admin password" 
                    {...field} 
                    className="form-input-enhanced focus-visible:ring-slate-500"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs mt-1" />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="form-button-enhanced"
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
} 