import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Create a direct connection to the database
    const client = createClient({
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
    return NextResponse.json({ 
      success: true,
      updates: result.rows 
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Parse the request body
    const { title, content } = await request.json();
    
    // Validate input
    if (!title || !content) {
      return NextResponse.json({ 
        success: false,
        error: 'Title and content are required' 
      }, { status: 400 });
    }
    
    // Create a direct connection to the database
    const client = createClient({
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
    return NextResponse.json({ 
      success: true, 
      update: result.rows[0]
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message
    }, { status: 500 });
  }
} 