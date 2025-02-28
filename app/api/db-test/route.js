import { NextResponse } from 'next/server';
import * as db from '../../lib/db';

export const dynamic = 'force-dynamic';
export const maxDuration = 10; // Set maximum duration to 10 seconds

// Override Node.js TLS rejection for development
// Note: This is not recommended for production, but works for development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function GET() {
  console.log('DB-TEST: Starting database connection test');
  
  try {
    // Simple query to test connection
    const result = await db.query('SELECT NOW() as time');
    console.log('DB-TEST: Simple query successful');
    
    // Check if updates table exists
    const tableExists = await db.checkUpdatesTable();
    console.log(`DB-TEST: Updates table exists: ${tableExists}`);
    
    let count = 0;
    if (tableExists) {
      // Count records if table exists
      count = await db.countUpdates();
      console.log(`DB-TEST: Found ${count} records in updates table`);
    }
    
    // Return success response with connection info
    const responseData = {
      success: true,
      connection: 'successful',
      time: result.rows[0].time,
      updatesTable: {
        exists: tableExists,
        recordCount: count
      },
      diagnostics: {
        timestamp: new Date().toISOString(),
        endpoint: '/api/db-test'
      }
    };
    
    return new NextResponse(JSON.stringify(responseData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error(`DB-TEST ERROR: ${error.message}`);
    console.error(error.stack);
    
    // Return error response
    const errorResponse = {
      success: false,
      error: error.message,
      stack: error.stack,
      diagnostics: {
        timestamp: new Date().toISOString(),
        endpoint: '/api/db-test'
      }
    };
    
    return new NextResponse(JSON.stringify(errorResponse), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  }
} 