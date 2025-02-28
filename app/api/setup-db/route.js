import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('GET /api/setup-db: Connecting to database...');
    const client = createClient();
    
    console.log('GET /api/setup-db: Creating updates table...');
    await client.sql`
      CREATE TABLE IF NOT EXISTS updates (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    console.log('GET /api/setup-db: Checking if table is empty...');
    const countResult = await client.sql`SELECT COUNT(*) FROM updates;`;
    const count = parseInt(countResult.rows[0].count);
    
    let testRecordInserted = false;
    
    if (count === 0) {
      console.log('GET /api/setup-db: Table is empty, inserting test record...');
      await client.sql`
        INSERT INTO updates (title, content, created_at)
        VALUES ('Welcome to TIE CEO', 'This is the first update on our journey to build a $1B SaaS company!', NOW());
      `;
      testRecordInserted = true;
    }
    
    console.log('GET /api/setup-db: Setup completed successfully');
    return NextResponse.json({ 
      success: true, 
      message: 'Database setup completed successfully',
      tableCreated: true,
      testRecordInserted: testRecordInserted,
      recordCount: count
    });
  } catch (error) {
    console.error('Error setting up database:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to set up database', 
      details: error.message
    }, { status: 500 });
  }
} 