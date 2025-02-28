import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 10; // Set maximum duration to 10 seconds

export async function GET() {
  let client = null;
  
  try {
    console.log('SETUP-DB: Starting database setup');
    
    // Create a direct connection to the database
    client = createClient({
      connectionTimeoutMillis: 5000 // 5 second connection timeout
    });
    
    console.log('SETUP-DB: Creating updates table if not exists');
    
    // Create the updates table if it doesn't exist
    await Promise.race([
      client.sql`
        CREATE TABLE IF NOT EXISTS updates (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Table creation timed out after 5 seconds')), 5000)
      )
    ]);
    
    console.log('SETUP-DB: Checking for existing records');
    
    // Check if the table has any records
    const countResult = await Promise.race([
      client.sql`SELECT COUNT(*) FROM updates;`,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Count query timed out after 5 seconds')), 5000)
      )
    ]);
    
    const count = parseInt(countResult.rows[0].count);
    console.log(`SETUP-DB: Found ${count} existing records`);
    
    // Insert a sample record if the table is empty
    if (count === 0) {
      console.log('SETUP-DB: Inserting sample record');
      
      await Promise.race([
        client.sql`
          INSERT INTO updates (title, content, created_at)
          VALUES ('Welcome to TIE CEO', 'This is the first update on our journey to build a $1B SaaS company!', NOW());
        `,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Sample record insertion timed out after 5 seconds')), 5000)
        )
      ]);
      
      console.log('SETUP-DB: Sample record inserted');
    }
    
    console.log('SETUP-DB: Setup completed successfully');
    
    // Return success
    return NextResponse.json({ 
      success: true, 
      message: 'Database setup completed successfully',
      recordCount: count,
      sampleRecordAdded: count === 0
    }, {
      status: 200,
      headers: { 
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('SETUP-DB ERROR:', error);
    
    // Determine if it's a timeout error
    const isTimeout = error.message.includes('timed out') || 
                      error.code === 'ETIMEDOUT' || 
                      error.code === 'ESOCKETTIMEDOUT';
    
    return NextResponse.json({ 
      success: false,
      error: error.message,
      errorType: isTimeout ? 'timeout' : 'database',
      stack: error.stack
    }, {
      status: isTimeout ? 504 : 500,
      headers: { 
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } finally {
    // Ensure client is released
    if (client) {
      try {
        await client.end();
        console.log('SETUP-DB: Database connection closed');
      } catch (e) {
        console.error('SETUP-DB: Error closing database connection:', e);
      }
    }
  }
} 