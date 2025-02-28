import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  let client = null;
  
  try {
    // Create a direct connection to the database
    client = createClient({
      connectionTimeoutMillis: 5000 // 5 second connection timeout
    });
    
    // Create the updates table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS updates (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    // Check if the table has any records
    const countResult = await client.sql`SELECT COUNT(*) FROM updates;`;
    const count = parseInt(countResult.rows[0].count);
    
    // Insert a sample record if the table is empty
    if (count === 0) {
      await client.sql`
        INSERT INTO updates (title, content, created_at)
        VALUES ('Welcome to TIE CEO', 'This is the first update on our journey to build a $1B SaaS company!', NOW());
      `;
    }
    
    // Return success
    return new NextResponse(JSON.stringify({ 
      success: true, 
      message: 'Database setup completed successfully',
      recordCount: count,
      sampleRecordAdded: count === 0
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Database setup error:', error);
    
    return new NextResponse(JSON.stringify({ 
      success: false,
      error: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } finally {
    // Ensure client is released
    if (client) {
      try {
        await client.end();
      } catch (e) {
        console.error('Error closing database connection:', e);
      }
    }
  }
} 