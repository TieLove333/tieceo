import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // First, ensure the table exists
    await sql`
      CREATE TABLE IF NOT EXISTS updates (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    // Then query for updates
    const { rows } = await sql`
      SELECT * FROM updates 
      ORDER BY created_at DESC 
      LIMIT 10
    `;
    
    return Response.json(rows);
  } catch (error) {
    console.error('Failed to fetch updates:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, content } = await request.json();
    
    if (!title || !content) {
      return Response.json({ error: 'Title and content are required' }, { status: 400 });
    }
    
    // Ensure the table exists
    await sql`
      CREATE TABLE IF NOT EXISTS updates (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    // Insert the new update
    const { rows } = await sql`
      INSERT INTO updates (title, content, created_at)
      VALUES (${title}, ${content}, NOW())
      RETURNING *
    `;
    
    return Response.json(rows[0], { status: 201 });
  } catch (error) {
    console.error('Failed to create update:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
} 