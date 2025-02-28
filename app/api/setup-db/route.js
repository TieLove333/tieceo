import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = createClient();
    
    // Create the updates table
    await client.sql`
      CREATE TABLE IF NOT EXISTS updates (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
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