import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// In-memory storage for updates (will reset on each deployment)
let updates = [];

export async function POST(request) {
  try {
    const data = await request.json();
    const { title, content, date } = data;
    
    const client = createClient();
    await client.connect();
    
    // Insert into Blog table instead of updates
    const result = await client.sql`
      INSERT INTO Blog (title, content, created_at)
      VALUES (${title}, ${content}, ${date})
      RETURNING *;
    `;
    
    await client.end();
    return NextResponse.json({ success: true, post: result.rows[0] });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = createClient();
    await client.connect();
    
    // Query the Blog table
    const result = await client.sql`
      SELECT * FROM Blog 
      ORDER BY created_at DESC 
      LIMIT 50;
    `;
    
    await client.end();
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 