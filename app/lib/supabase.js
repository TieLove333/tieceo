import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication helpers
export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signUpWithEmail(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Updates API
export async function createUpdate(title, content, category, publishDate) {
  const pubDate = publishDate && publishDate.trim() !== '' 
    ? publishDate 
    : new Date().toISOString().split('T')[0]; // Use today if not provided or empty
  
  const { data, error } = await supabase
    .from('updates')
    .insert([{ 
      title, 
      content, 
      category, 
      publish_date: pubDate,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select();
  
  return { data, error };
}

export async function getUpdates() {
  const { data, error } = await supabase
    .from('updates')
    .select('*')
    .order('publish_date', { ascending: false })
    .order('created_at', { ascending: false });
  
  return { data, error };
}

export async function getUpdateById(id) {
  const { data, error } = await supabase
    .from('updates')
    .select('*')
    .eq('id', id)
    .single();
  
  return { data, error };
}

export async function updateUpdate(id, { title, content, category, publishDate }) {
  const pubDate = publishDate && publishDate.trim() !== '' 
    ? publishDate 
    : new Date().toISOString().split('T')[0]; // Use today if not provided or empty

  const { data, error } = await supabase
    .from('updates')
    .update({ 
      title, 
      content, 
      category,
      publish_date: pubDate,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select();
  
  return { data, error };
}

export async function deleteUpdate(id) {
  const { error } = await supabase
    .from('updates')
    .delete()
    .eq('id', id);
  
  return { error };
}

// Function to execute a direct SQL query through Supabase
export async function executeSql(sql) {
  const { data, error } = await supabase.rpc('execute_sql', { query: sql });
  
  if (error) {
    console.error('SQL execution error:', error);
    throw error;
  }
  
  return { data, error: null };
}

// Function to directly add columns to the updates table
export async function addMissingColumns() {
  try {
    console.log('Attempting to add missing columns directly via Supabase SQL...');
    
    // Add publish_date column if it doesn't exist
    await executeSql(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_schema = 'public' 
          AND table_name = 'updates'
          AND column_name = 'publish_date'
        ) THEN
          ALTER TABLE public.updates 
          ADD COLUMN publish_date DATE DEFAULT CURRENT_DATE;
        END IF;
      END
      $$;
    `);
    
    // Add updated_at column if it doesn't exist
    await executeSql(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_schema = 'public' 
          AND table_name = 'updates'
          AND column_name = 'updated_at'
        ) THEN
          ALTER TABLE public.updates 
          ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
        END IF;
      END
      $$;
    `);
    
    return { success: true, message: 'Columns added successfully' };
  } catch (error) {
    console.error('Error adding columns directly:', error);
    return { success: false, error };
  }
} 