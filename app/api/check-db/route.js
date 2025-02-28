import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Add this line to disable static generation
export const dynamic = 'force-dynamic';

// Remove the edge runtime directive if present
// export const runtime = 'edge';

export async function GET() {
  try {
    // Create a client
    const client = createClient();
    
    // Test the connection
    const result = await client.sql`SELECT NOW() as current_time;`;
    
    // Check if the updates table exists
    const tableCheck = await client.sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'updates'
      ) as table_exists;
    `;
    
    const tableExists = tableCheck.rows[0].table_exists;
    
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
    return NextResponse.json({
      success: false,
      error: 'Failed to connect to database',
      errorMessage: error.message,
      errorStack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    }, { status: 500 });
  }
} 