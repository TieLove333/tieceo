// Database utility module
import { Pool } from 'pg';

// Override Node.js TLS rejection for development
// Note: This is not recommended for production, but works for development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Create a PostgreSQL connection pool using the connection string directly
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NON_POOLING
});

// Log connection string for debugging (partially masked)
const connString = process.env.POSTGRES_URL_NON_POOLING || '';
const maskedConnString = connString.length > 20 
  ? connString.substring(0, 20) + '...' + connString.substring(connString.length - 20)
  : 'Not set';

console.log('DB: Connection string (masked):', maskedConnString);

// Function to get a client from the pool
export async function getClient() {
  return await pool.connect();
}

// Function to execute a query and release the client
export async function query(text, params = []) {
  const client = await getClient();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

// Function to check if the updates table exists
export async function checkUpdatesTable() {
  const result = await query(`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'updates'
    ) as table_exists
  `);
  return result.rows[0].table_exists;
}

// Function to create the updates table
export async function createUpdatesTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS updates (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// Function to get all updates
export async function getUpdates(limit = 10) {
  const result = await query(`
    SELECT * FROM updates 
    ORDER BY created_at DESC
    LIMIT $1;
  `, [limit]);
  return result.rows;
}

// Function to create a new update
export async function createUpdate(title, content) {
  const result = await query(`
    INSERT INTO updates (title, content, created_at)
    VALUES ($1, $2, NOW())
    RETURNING *;
  `, [title, content]);
  return result.rows[0];
}

// Function to count updates
export async function countUpdates() {
  const result = await query('SELECT COUNT(*) FROM updates');
  return parseInt(result.rows[0].count);
}

// Function to insert a sample update if none exist
export async function insertSampleUpdate() {
  const count = await countUpdates();
  if (count === 0) {
    return await createUpdate(
      'Welcome to TIE CEO', 
      'This is the first update on our journey to build a $1B SaaS company!'
    );
  }
  return null;
} 