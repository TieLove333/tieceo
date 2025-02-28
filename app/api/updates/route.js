import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 10; // Set maximum duration to 10 seconds

export async function GET() {
  let client = null;
  
  try {
    console.log('UPDATES-API: Starting database connection');
    
    // Create a direct connection to the database
    client = createClient({
      connectionTimeoutMillis: 5000, // 5 second connection timeout
      query_timeout: 10000 // 10 second query timeout
    });
    
    console.log('UPDATES-API: Fetching updates');
    
    // Simple query to test connection
    const result = await Promise.race([
      client.sql`
        SELECT * FROM updates 
        ORDER BY created_at DESC
        LIMIT 10;
      `,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database query timed out after 8 seconds')), 8000)
      )
    ]);
    
    console.log(`UPDATES-API: Found ${result.rows.length} updates`);
    
    // Return the results
    return NextResponse.json({ 
      success: true,
      updates: result.rows 
    }, {
      status: 200,
      headers: { 
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('UPDATES-API ERROR:', error);
    
    // Determine if it's a timeout error
    const isTimeout = error.message.includes('timed out') || 
                      error.code === 'ETIMEDOUT' || 
                      error.code === 'ESOCKETTIMEDOUT';
    
    return NextResponse.json({ 
      success: false,
      error: error.message,
      errorType: isTimeout ? 'timeout' : 'database'
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
        console.log('UPDATES-API: Database connection closed');
      } catch (e) {
        console.error('UPDATES-API: Error closing database connection:', e);
      }
    }
  }
}

export async function POST(request) {
  let client = null;
  
  try {
    console.log('UPDATES-API: Processing POST request');
    
    // Parse the request body
    const { title, content } = await request.json();
    
    // Validate input
    if (!title || !content) {
      console.log('UPDATES-API: Validation failed - missing title or content');
      return NextResponse.json({ 
        success: false,
        error: 'Title and content are required' 
      }, {
        status: 400,
        headers: { 
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    }
    
    console.log('UPDATES-API: Connecting to database for insert');
    
    // Create a direct connection to the database
    client = createClient({
      connectionTimeoutMillis: 5000, // 5 second connection timeout
      query_timeout: 10000 // 10 second query timeout
    });
    
    console.log('UPDATES-API: Inserting new update');
    
    // Insert the update
    const result = await Promise.race([
      client.sql`
        INSERT INTO updates (title, content, created_at)
        VALUES (${title}, ${content}, NOW())
        RETURNING *;
      `,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database insert timed out after 8 seconds')), 8000)
      )
    ]);
    
    console.log('UPDATES-API: Insert successful');
    
    // Return success
    return NextResponse.json({ 
      success: true, 
      update: result.rows[0]
    }, {
      status: 200,
      headers: { 
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('UPDATES-API POST ERROR:', error);
    
    // Determine if it's a timeout error
    const isTimeout = error.message.includes('timed out') || 
                      error.code === 'ETIMEDOUT' || 
                      error.code === 'ESOCKETTIMEDOUT';
    
    return NextResponse.json({ 
      success: false,
      error: error.message,
      errorType: isTimeout ? 'timeout' : 'database'
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
        console.log('UPDATES-API: POST database connection closed');
      } catch (e) {
        console.error('UPDATES-API: Error closing POST database connection:', e);
      }
    }
  }
} 