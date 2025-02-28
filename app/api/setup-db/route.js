import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Ensure we're using Node.js runtime, not Edge

export async function GET() {
  try {
    console.log('GET /api/setup-db: Connecting to database...');
    const client = createClient();
    
    console.log('GET /api/setup-db: Creating updates table...');
    // Create the updates table
    await client.sql`
      CREATE TABLE IF NOT EXISTS updates (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    console.log('GET /api/setup-db: Checking if table is empty...');
    // Insert a test record if the table is empty
    const countResult = await client.sql`SELECT COUNT(*) FROM updates;`;
    const count = parseInt(countResult.rows[0].count);
    
    if (count === 0) {
      console.log('GET /api/setup-db: Table is empty, inserting test record...');
      await client.sql`
        INSERT INTO updates (title, content, created_at)
        VALUES ('Welcome to TIE CEO', 'This is the first update on our journey to build a $1B SaaS company!', NOW());
      `;
    }
    
    console.log('GET /api/setup-db: Setup completed successfully');
    return NextResponse.json({ 
      success: true, 
      message: 'Database setup completed successfully',
      tableCreated: true,
      testRecordInserted: count === 0
    });
  } catch (error) {
    console.error('Error setting up database:', error);
    // Ensure we're returning a proper JSON response
    return new NextResponse(
      JSON.stringify({ 
        success: false,
        error: 'Failed to set up database', 
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
} 