// test-db.js
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const { Pool } = pg;

// Set up dotenv to load .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '.env.local') });

// Log the environment variables
console.log('Environment variables:');
console.log('POSTGRES_URL_NON_POOLING:', process.env.POSTGRES_URL_NON_POOLING ? 'Set (length: ' + process.env.POSTGRES_URL_NON_POOLING.length + ')' : 'Not set');
console.log('POSTGRES_HOST:', process.env.POSTGRES_HOST || 'Not set');
console.log('POSTGRES_USER:', process.env.POSTGRES_USER || 'Not set');
console.log('POSTGRES_DATABASE:', process.env.POSTGRES_DATABASE || 'Not set');

// Parse the connection string to extract components
const connectionString = process.env.POSTGRES_URL_NON_POOLING;
console.log('Parsed connection string components:');
try {
  const url = new URL(connectionString);
  console.log('- Host:', url.hostname);
  console.log('- Port:', url.port);
  console.log('- Database:', url.pathname.substring(1));
  console.log('- SSL Mode:', url.searchParams.get('sslmode'));
} catch (e) {
  console.error('Error parsing connection string:', e.message);
}

// Override Node.js TLS rejection for development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Create a PostgreSQL connection pool with the connection string
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NON_POOLING
});

async function testConnection() {
  let client = null;
  
  try {
    console.log('Starting database connection test...');
    
    // Get a client from the pool
    client = await pool.connect();
    console.log('Successfully connected to the database!');
    
    // Test the connection with a simple query
    const result = await client.query('SELECT NOW() as time');
    console.log('Current database time:', result.rows[0].time);
    
    // Check if the updates table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'updates'
      ) as table_exists
    `);
    
    const tableExists = tableCheck.rows[0].table_exists;
    console.log(`Updates table exists: ${tableExists}`);
    
    if (tableExists) {
      // Count records in the updates table
      const countResult = await client.query('SELECT COUNT(*) FROM updates');
      console.log(`Number of records in updates table: ${countResult.rows[0].count}`);
    } else {
      // Create the updates table
      console.log('Creating updates table...');
      await client.query(`
        CREATE TABLE updates (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('Updates table created successfully!');
      
      // Insert a sample record
      console.log('Inserting sample record...');
      await client.query(`
        INSERT INTO updates (title, content, created_at)
        VALUES ('Welcome to TIE CEO', 'This is the first update on our journey to build a $1B SaaS company!', NOW());
      `);
      console.log('Sample record inserted successfully!');
    }
    
    console.log('Database test completed successfully!');
  } catch (error) {
    console.error('ERROR:', error);
  } finally {
    // Release the client back to the pool
    if (client) {
      try {
        client.release();
        console.log('Database connection released');
      } catch (e) {
        console.error('Error releasing database connection:', e);
      }
    }
    
    // End the pool
    await pool.end();
  }
}

// Run the test
testConnection(); 