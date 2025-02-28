import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Ensure we're using Node.js runtime, not Edge
export const maxDuration = 10; // Set maximum duration to 10 seconds

export async function GET() {
  try {
    console.log('GET /api/updates: Connecting to database...');
    const client = createClient();
    
    console.log('GET /api/updates: Fetching updates...');
    const result = await client.sql`
      SELECT id, title, content, created_at 
      FROM updates 
      ORDER BY created_at DESC
      LIMIT 20;
    `;
    
    console.log(`GET /api/updates: Found ${result.rows.length} updates`);
    return NextResponse.json({ 
      success: true,
      updates: result.rows 
    });
  } catch (error) {
    console.error('Error fetching updates:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to fetch updates',
      details: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    console.log('POST /api/updates: Connecting to database...');
    const client = createClient();
    
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
    const result = await client.sql`
      INSERT INTO updates (title, content, created_at)
      VALUES (${data.title}, ${data.content}, NOW())
      RETURNING id, title, content, created_at;
    `;
    
    console.log('POST /api/updates: Update created successfully');
    return NextResponse.json({ 
      success: true, 
      update: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating update:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to create update',
      details: error.message
    }, { status: 500 });
  }
} 