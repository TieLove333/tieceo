import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 5; // Set maximum duration to 5 seconds

export async function GET() {
  try {
    const client = createClient();
    
    // Create the updates table with a timeout
    const result = await Promise.race([
      client.sql`
        CREATE TABLE IF NOT EXISTS updates (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database operation timed out')), 4000)
      )
    ]);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database table created successfully' 
    });
  } catch (error) {
    console.error('Error setting up database:', error);
    return NextResponse.json({ 
      error: 'Failed to set up database', 
      details: error.message 
    }, { status: 500 });
  }
} 