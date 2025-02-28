import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Create a client with explicit connection details for debugging
    const client = createClient();
    
    // Try a simple query
    const result = await client.sql`SELECT 1 as test;`;
    
    return NextResponse.json({ 
      success: true, 
      connectionTest: result.rows[0],
      message: 'Database connection successful'
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack,
      name: error.name
    }, { status: 500 });
  }
} 