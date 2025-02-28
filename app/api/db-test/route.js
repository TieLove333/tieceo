import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 10; // Set maximum duration to 10 seconds

export async function GET() {
  let client = null;
  
  try {
    console.log('DB-TEST: Starting database connection test');
    
    // Create a direct connection to the database with explicit timeout
    client = createClient({
      connectionTimeoutMillis: 5000 // 5 second connection timeout
    });
    
    console.log('DB-TEST: Connection established, testing with simple query');
    
    // Test the connection with a simple query
    const result = await Promise.race([
      client.sql`SELECT NOW() as time;`,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database query timed out after 5 seconds')), 5000)
      )
    ]);
    
    console.log('DB-TEST: Simple query successful, checking for updates table');
    
    // Check if the updates table exists
    const tableCheck = await Promise.race([
      client.sql`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'updates'
        ) as table_exists;
      `,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Table check query timed out after 5 seconds')), 5000)
      )
    ]);
    
    const tableExists = tableCheck.rows[0].table_exists;
    
    console.log(`DB-TEST: Updates table exists: ${tableExists}`);
    
    // Return connection info and environment variables for debugging
    return NextResponse.json({
      success: true,
      time: result.rows[0].time,
      updatesTableExists: tableExists,
      env: {
        POSTGRES_URL: process.env.POSTGRES_URL ? 'Set' : 'Not set',
        POSTGRES_HOST: process.env.POSTGRES_HOST || 'Not set',
        POSTGRES_DATABASE: process.env.POSTGRES_DATABASE || 'Not set',
        POSTGRES_USER: process.env.POSTGRES_USER ? 'Set' : 'Not set',
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ? 'Set' : 'Not set'
      },
      diagnostics: {
        timestamp: new Date().toISOString(),
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development'
      }
    }, {
      status: 200,
      headers: { 
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('DB-TEST ERROR:', error);
    
    // Determine if it's a timeout error
    const isTimeout = error.message.includes('timed out') || 
                      error.code === 'ETIMEDOUT' || 
                      error.code === 'ESOCKETTIMEDOUT';
    
    return NextResponse.json({
      success: false,
      error: error.message,
      errorType: isTimeout ? 'timeout' : 'connection',
      stack: error.stack,
      diagnostics: {
        timestamp: new Date().toISOString(),
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development'
      }
    }, {
      status: isTimeout ? 504 : 500,
      headers: { 
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } finally {
    // Ensure client is released
    if (client) {
      try {
        await client.end();
        console.log('DB-TEST: Database connection closed');
      } catch (e) {
        console.error('DB-TEST: Error closing database connection:', e);
      }
    }
  }
} 