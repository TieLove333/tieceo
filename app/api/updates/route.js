import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// In-memory storage for updates (will reset on each deployment)
let updates = [];

export async function POST(request) {
  try {
    const data = await request.json();
    const { title, content, date } = data;
    
    console.log('Received update data:', { title, content, date });

    if (!title || !content) {
      console.error('Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    const client = createClient();
    await client.connect();
    
    const result = await client.sql`
      INSERT INTO updates (title, content, created_at)
      VALUES (${title}, ${content}, ${date})
      RETURNING *;
    `;
    
    await client.end();

    console.log('Created update:', result.rows[0]);

    return NextResponse.json({ 
      success: true, 
      update: result.rows[0] 
    }, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error saving update:', error);
    return NextResponse.json(
      { error: 'Failed to save update', details: error.message }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = createClient();
    await client.connect();
    
    const result = await client.sql`
      SELECT * FROM updates 
      ORDER BY created_at DESC 
      LIMIT 50;
    `;
    
    await client.end();
    
    return NextResponse.json(result.rows, {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching updates:', error);
    return NextResponse.json(
      { error: 'Failed to read updates', details: error.message }, 
      { status: 500 }
    );
  }
} 