import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client directly
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET() {
  try {
    console.log('Complete database rebuild requested');
    
    // Step 1: Get all current data
    const { data: existingData, error: fetchError } = await supabase
      .from('updates')
      .select('*');
    
    if (fetchError) {
      console.error('Error fetching existing data:', fetchError);
      return NextResponse.json({
        success: false,
        message: 'Failed to fetch existing data',
        error: fetchError
      }, { status: 500 });
    }
    
    // Step 2: Drop the table
    const { error: dropError } = await supabase.rpc('execute_sql', { 
      query: 'DROP TABLE IF EXISTS public.updates' 
    });
    
    if (dropError) {
      console.error('Error dropping table:', dropError);
      return NextResponse.json({
        success: false,
        message: 'Failed to drop table',
        error: dropError
      }, { status: 500 });
    }
    
    // Step 3: Create the table with all required columns
    const { error: createError } = await supabase.rpc('execute_sql', { 
      query: `
        CREATE TABLE public.updates (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          category VARCHAR(50) DEFAULT 'General',
          publish_date DATE DEFAULT CURRENT_DATE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });
    
    if (createError) {
      console.error('Error creating table:', createError);
      return NextResponse.json({
        success: false,
        message: 'Failed to create table',
        error: createError
      }, { status: 500 });
    }
    
    // Step 4: Restore the data if it existed
    if (existingData && existingData.length > 0) {
      for (const item of existingData) {
        // Make sure the data has required fields
        const record = {
          title: item.title || 'Untitled',
          content: item.content || '',
          category: item.category || 'General',
          publish_date: item.publish_date || new Date().toISOString().split('T')[0],
          created_at: item.created_at || new Date().toISOString(),
          updated_at: item.updated_at || new Date().toISOString()
        };
        
        const { error: insertError } = await supabase
          .from('updates')
          .insert([record]);
        
        if (insertError) {
          console.error('Error inserting record:', insertError);
          // Continue with other records even if one fails
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Database completely rebuilt successfully',
      dataRestored: existingData?.length || 0
    });
  } catch (error) {
    console.error('Error in rebuild API:', error);
    return NextResponse.json({
      success: false,
      message: 'Error rebuilding database',
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
} 