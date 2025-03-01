import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';
export const maxDuration = 10; // Set maximum duration to 10 seconds

// Override Node.js TLS rejection for development
// Note: This is not recommended for production, but works for development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function GET() {
  try {
    // Try to create the updates table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS updates (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    // Insert a test update if table was just created
    await sql`
      INSERT INTO updates (title, content, created_at)
      VALUES ('Test Update', 'This is a test update', NOW())
      ON CONFLICT DO NOTHING;
    `;
    
    // Get all environment variables
    const env = Object.keys(process.env)
      .filter(key => key.includes('POSTGRES') || key.includes('DATABASE'))
      .reduce((obj, key) => {
        obj[key] = process.env[key] ? 
          (process.env[key].length > 10 ? 
            process.env[key].substring(0, 5) + '...' + 
            process.env[key].substring(process.env[key].length - 5) : 
            process.env[key]) : 
          'undefined';
        return obj;
      }, {});
    
    return Response.json({
      message: 'Database connection test',
      environment: env,
      success: true
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return Response.json({
      error: error.message,
      stack: error.stack,
      success: false
    }, { status: 500 });
  }
} 