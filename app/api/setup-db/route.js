import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Ensure we're using Node.js runtime, not Edge
export const maxDuration = 10; // Set maximum duration to 10 seconds

export async function GET() {
  let client;
  try {
    console.log('GET /api/setup-db: Connecting to database...');
    client = createClient();
    
    console.log('GET /api/setup-db: Creating updates table...');
    // Use a timeout promise to prevent hanging
    const createTablePromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Create table operation timed out after 8 seconds')), 8000);
    });
    
    // Race the database query against the timeout
    await Promise.race([
      client.sql`
        CREATE TABLE IF NOT EXISTS updates (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `,
      createTablePromise
    ]);
    
    console.log('GET /api/setup-db: Checking if table is empty...');
    // Check if the table is empty with a timeout
    const countPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Count operation timed out after 5 seconds')), 5000);
    });
    
    const countResult = await Promise.race([
      client.sql`SELECT COUNT(*) FROM updates;`,
      countPromise
    ]);
    
    const count = parseInt(countResult.rows[0].count);
    
    let testRecordInserted = false;
    
    if (count === 0) {
      console.log('GET /api/setup-db: Table is empty, inserting test record...');
      // Insert a test record with a timeout
      const insertPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Insert operation timed out after 5 seconds')), 5000);
      });
      
      await Promise.race([
        client.sql`
          INSERT INTO updates (title, content, created_at)
          VALUES ('Welcome to TIE CEO', 'This is the first update on our journey to build a $1B SaaS company!', NOW());
        `,
        insertPromise
      ]);
      
      testRecordInserted = true;
    }
    
    console.log('GET /api/setup-db: Setup completed successfully');
    return NextResponse.json({ 
      success: true, 
      message: 'Database setup completed successfully',
      tableCreated: true,
      testRecordInserted: testRecordInserted
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
  } finally {
    // Close the client connection if it exists
    if (client && typeof client.end === 'function') {
      try {
        await client.end();
      } catch (e) {
        console.error('Error closing database connection:', e);
      }
    }
  }
} 