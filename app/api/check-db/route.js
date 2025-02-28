import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Add this line to disable static generation
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Ensure we're using Node.js runtime, not Edge
export const maxDuration = 10; // Set maximum duration to 10 seconds

export async function GET() {
  let client;
  try {
    console.log('GET /api/check-db: Connecting to database...');
    // Create a client
    client = createClient();
    
    console.log('GET /api/check-db: Testing connection...');
    // Test the connection with a timeout
    const timePromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Time query timed out after 5 seconds')), 5000);
    });
    
    const result = await Promise.race([
      client.sql`SELECT NOW() as current_time;`,
      timePromise
    ]);
    
    console.log('GET /api/check-db: Checking if updates table exists...');
    // Check if the updates table exists with a timeout
    const tableCheckPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Table check query timed out after 5 seconds')), 5000);
    });
    
    const tableCheck = await Promise.race([
      client.sql`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'updates'
        ) as table_exists;
      `,
      tableCheckPromise
    ]);
    
    const tableExists = tableCheck.rows[0].table_exists;
    
    console.log(`GET /api/check-db: Updates table exists: ${tableExists}`);
    // Return connection info
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      currentTime: result.rows[0].current_time,
      updatesTableExists: tableExists,
      connectionInfo: {
        host: process.env.POSTGRES_HOST || 'Not set',
        database: process.env.POSTGRES_DATABASE || 'Not set',
        username: process.env.POSTGRES_USER ? 'Set' : 'Not set',
        password: process.env.POSTGRES_PASSWORD ? 'Set' : 'Not set',
      }
    });
  } catch (error) {
    console.error('Database connection error:', error);
    // Ensure we're returning a proper JSON response
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: 'Failed to connect to database',
        errorMessage: error.message,
        errorStack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } finally {
    // Close the client connection if it exists
    if (client && typeof client.end === 'function') {
      try {
        await client.end();
      } catch (e) {
        console.error('Error closing database connection:', e);
      }
    }
  }
} 