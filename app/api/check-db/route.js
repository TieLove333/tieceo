import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Add this line to disable static generation
export const dynamic = 'force-dynamic';

// Remove the edge runtime directive if present
// export const runtime = 'edge';

export async function GET() {
  try {
    const client = createClient();
    
    // Check if the table exists
    const result = await client.sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'updates'
      );
    `;
    
    const tableExists = result.rows[0].exists;
    
    return NextResponse.json({ 
      success: true, 
      tableExists,
      message: tableExists ? 'Updates table exists' : 'Updates table does not exist'
    });
  } catch (error) {
    console.error('Error checking database:', error);
    return NextResponse.json({ 
      error: 'Failed to check database', 
      details: error.message 
    }, { status: 500 });
  }
} 