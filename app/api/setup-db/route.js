import { NextResponse } from 'next/server';
import * as db from '../../lib/db';

export const dynamic = 'force-dynamic';
export const maxDuration = 10; // Set maximum duration to 10 seconds

// Override Node.js TLS rejection for development
// Note: This is not recommended for production, but works for development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function GET() {
  console.log('SETUP-DB: Starting database setup process');
  
  try {
    // Create updates table if it doesn't exist
    await db.createUpdatesTable();
    console.log('SETUP-DB: Updates table created or already exists');
    
    // Check if there are any records
    const count = await db.countUpdates();
    console.log(`SETUP-DB: Found ${count} records in updates table`);
    
    let sampleAdded = false;
    
    // Add a sample record if the table is empty
    if (count === 0) {
      await db.insertSampleUpdate();
      console.log('SETUP-DB: Added sample update');
      sampleAdded = true;
    }
    
    console.log('SETUP-DB: Database setup completed successfully');
    
    // Return success response
    const responseData = {
      success: true,
      message: 'Database setup completed successfully',
      recordCount: count,
      sampleAdded: sampleAdded,
      diagnostics: {
        timestamp: new Date().toISOString(),
        endpoint: '/api/setup-db'
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
    console.error(`SETUP-DB ERROR: ${error.message}`);
    console.error(error.stack);
    
    // Return error response
    const errorResponse = {
      success: false,
      error: error.message,
      stack: error.stack,
      diagnostics: {
        timestamp: new Date().toISOString(),
        endpoint: '/api/setup-db'
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