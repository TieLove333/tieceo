import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  let client = null;
  
  try {
    // Create a direct connection to the database with explicit timeout
    client = createClient({
      connectionTimeoutMillis: 5000 // 5 second connection timeout
    });
    
    // Test the connection with a simple query
    const result = await client.sql`SELECT NOW() as time;`;
    
    // Check if the updates table exists
    const tableCheck = await client.sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'updates'
      ) as table_exists;
    `;
    
    const tableExists = tableCheck.rows[0].table_exists;
    
    // Return connection info and environment variables for debugging
    return new NextResponse(JSON.stringify({
      success: true,
      time: result.rows[0].time,
      updatesTableExists: tableExists,
      env: {
        POSTGRES_URL: process.env.POSTGRES_URL ? 'Set' : 'Not set',
        POSTGRES_HOST: process.env.POSTGRES_HOST || 'Not set',
        POSTGRES_DATABASE: process.env.POSTGRES_DATABASE || 'Not set',
        POSTGRES_USER: process.env.POSTGRES_USER ? 'Set' : 'Not set',
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ? 'Set' : 'Not set'
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Database test error:', error);
    
    return new NextResponse(JSON.stringify({
      success: false,
      error: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } finally {
    // Ensure client is released
    if (client) {
      try {
        await client.end();
      } catch (e) {
        console.error('Error closing database connection:', e);
      }
    }
  }
} 