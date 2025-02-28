import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    const client = createClient();
    
    const result = await client.sql`
      SELECT * FROM updates 
      ORDER BY created_at DESC;
    `;
    
    return NextResponse.json({ updates: result.rows });
  } catch (error) {
    console.error('Error fetching updates:', error);
    return NextResponse.json({ error: 'Failed to fetch updates' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const client = createClient();
    const data = await request.json();
    
    // Validate the data
    if (!data.title || !data.content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }
    
    // Insert into database
    const result = await client.sql`
      INSERT INTO updates (title, content, created_at)
      VALUES (${data.title}, ${data.content}, NOW())
      RETURNING *;
    `;
    
    return NextResponse.json({ 
      success: true, 
      update: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating update:', error);
    return NextResponse.json({ error: 'Failed to create update' }, { status: 500 });
  }
} 