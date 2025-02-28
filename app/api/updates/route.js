import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  let client = null;
  
  try {
    // Create a direct connection to the database
    client = createClient({
      connectionTimeoutMillis: 5000, // 5 second connection timeout
      query_timeout: 10000 // 10 second query timeout
    });
    
    // Simple query to test connection
    const result = await client.sql`
      SELECT * FROM updates 
      ORDER BY created_at DESC
      LIMIT 10;
    `;
    
    // Return the results
    return new NextResponse(JSON.stringify({ 
      success: true,
      updates: result.rows 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Database error:', error);
    
    return new NextResponse(JSON.stringify({ 
      success: false,
      error: error.message
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

export async function POST(request) {
  let client = null;
  
  try {
    // Parse the request body
    const { title, content } = await request.json();
    
    // Validate input
    if (!title || !content) {
      return new NextResponse(JSON.stringify({ 
        success: false,
        error: 'Title and content are required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Create a direct connection to the database
    client = createClient({
      connectionTimeoutMillis: 5000, // 5 second connection timeout
      query_timeout: 10000 // 10 second query timeout
    });
    
    // Insert the update
    const result = await client.sql`
      INSERT INTO updates (title, content, created_at)
      VALUES (${title}, ${content}, NOW())
      RETURNING *;
    `;
    
    // Return success
    return new NextResponse(JSON.stringify({ 
      success: true, 
      update: result.rows[0]
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Database error:', error);
    
    return new NextResponse(JSON.stringify({ 
      success: false,
      error: error.message
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