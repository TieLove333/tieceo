import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = createClient();
    
    // Create the updates table
    await client.sql`
      CREATE TABLE IF NOT EXISTS updates (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    // Insert a test record if the table is empty
    const countResult = await client.sql`SELECT COUNT(*) FROM updates;`;
    const count = parseInt(countResult.rows[0].count);
    
    if (count === 0) {
      await client.sql`
        INSERT INTO updates (title, content, created_at)
        VALUES ('Welcome to TIE CEO', 'This is the first update on our journey to build a $1B SaaS company!', NOW());
      `;
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database setup completed successfully',
      tableCreated: true,
      testRecordInserted: count === 0
    });
  } catch (error) {
    console.error('Error setting up database:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to set up database', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
} 