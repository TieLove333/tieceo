import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Ensure we're using Node.js runtime, not Edge
export const maxDuration = 10; // Set maximum duration to 10 seconds

export async function GET() {
  let client;
  try {
    console.log('GET /api/updates: Connecting to database...');
    client = createClient();
    
    console.log('GET /api/updates: Fetching updates...');
    // Use a timeout promise to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Database query timed out after 8 seconds')), 8000);
    });
    
    // Race the database query against the timeout
    const result = await Promise.race([
      client.sql`
        SELECT id, title, content, created_at 
        FROM updates 
        ORDER BY created_at DESC
        LIMIT 20;
      `,
      timeoutPromise
    ]);
    
    console.log(`GET /api/updates: Found ${result.rows.length} updates`);
    return NextResponse.json({ 
      success: true,
      updates: result.rows 
    });
  } catch (error) {
    console.error('Error fetching updates:', error);
    // Ensure we're returning a proper JSON response
    return new NextResponse(
      JSON.stringify({ 
        success: false,
        error: 'Failed to fetch updates',
        details: error.message
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

export async function POST(request) {
  let client;
  try {
    console.log('POST /api/updates: Connecting to database...');
    client = createClient();
    
    console.log('POST /api/updates: Parsing request body...');
    const data = await request.json();
    
    // Validate the data
    if (!data.title || !data.content) {
      console.log('POST /api/updates: Validation failed - missing title or content');
      return NextResponse.json({ 
        success: false,
        error: 'Title and content are required' 
      }, { status: 400 });
    }
    
    console.log('POST /api/updates: Inserting new update...');
    // Use a timeout promise to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Database query timed out after 8 seconds')), 8000);
    });
    
    // Race the database query against the timeout
    const result = await Promise.race([
      client.sql`
        INSERT INTO updates (title, content, created_at)
        VALUES (${data.title}, ${data.content}, NOW())
        RETURNING id, title, content, created_at;
      `,
      timeoutPromise
    ]);
    
    console.log('POST /api/updates: Update created successfully');
    return NextResponse.json({ 
      success: true, 
      update: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating update:', error);
    // Ensure we're returning a proper JSON response
    return new NextResponse(
      JSON.stringify({ 
        success: false,
        error: 'Failed to create update',
        details: error.message
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