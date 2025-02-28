import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Add this line to disable static generation
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Ensure we're using Node.js runtime, not Edge
export const maxDuration = 10; // Set maximum duration to 10 seconds

export async function GET() {
  try {
    console.log('GET /api/check-db: Connecting to database...');
    const client = createClient();
    
    console.log('GET /api/check-db: Testing connection...');
    const result = await client.sql`SELECT NOW() as current_time;`;
    
    console.log('GET /api/check-db: Checking if updates table exists...');
    const tableCheck = await client.sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'updates'
      ) as table_exists;
    `;
    
    const tableExists = tableCheck.rows[0].table_exists;
    
    console.log(`GET /api/check-db: Updates table exists: ${tableExists}`);
    
    // If table exists, get count of records
    let recordCount = 0;
    if (tableExists) {
      const countResult = await client.sql`SELECT COUNT(*) FROM updates;`;
      recordCount = parseInt(countResult.rows[0].count);
      console.log(`GET /api/check-db: Found ${recordCount} records in updates table`);
    }
    
    // Return connection info
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      currentTime: result.rows[0].current_time,
      updatesTableExists: tableExists,
      recordCount: recordCount,
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
      errorMessage: error.message
    }, { status: 500 });
  }
} 