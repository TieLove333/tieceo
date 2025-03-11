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
      category VARCHAR(50) DEFAULT 'General',
      publish_date DATE DEFAULT CURRENT_DATE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// Function to get all updates
export async function getUpdates(limit = 10) {
  const result = await query(`
    SELECT * FROM updates 
    ORDER BY publish_date DESC, created_at DESC
    LIMIT $1;
  `, [limit]);
  return result.rows;
}

// Function to create a new update
export async function createUpdate(title, content, category = 'General', publishDate = null) {
  const pubDate = publishDate || new Date().toISOString().split('T')[0]; // Use today if not provided
  const result = await query(`
    INSERT INTO updates (title, content, category, publish_date, created_at)
    VALUES ($1, $2, $3, $4, NOW())
    RETURNING *;
  `, [title, content, category, pubDate]);
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

// Function to delete an update by ID
export async function deleteUpdate(updateId) {
  // Ensure updateId is a number
  const numericUpdateId = parseInt(updateId, 10);
  
  if (isNaN(numericUpdateId)) {
    throw new Error('Invalid update ID');
  }
  
  const result = await query(`
    DELETE FROM updates 
    WHERE id = $1 
    RETURNING *;
  `, [numericUpdateId]);
  
  return result.rows.length > 0;
}

// Function to check if a column exists in the updates table
export async function checkColumnExists(columnName) {
  const result = await query(`
    SELECT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'updates'
      AND column_name = $1
    ) as column_exists
  `, [columnName]);
  return result.rows[0].column_exists;
}

// Function to add a column to the updates table if it doesn't exist
export async function addColumnIfNotExists(columnName, columnType, defaultValue = null) {
  try {
    const columnExists = await checkColumnExists(columnName);
    
    if (!columnExists) {
      console.log(`Adding missing column ${columnName} to updates table`);
      let defaultClause = '';
      
      if (defaultValue !== null) {
        defaultClause = ` DEFAULT ${defaultValue}`;
      }
      
      const alterQuery = `
        ALTER TABLE updates 
        ADD COLUMN ${columnName} ${columnType}${defaultClause}
      `;
      
      console.log(`Executing query: ${alterQuery}`);
      
      await query(alterQuery);
      console.log(`Successfully added column ${columnName}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error adding column ${columnName}:`, error);
    throw new Error(`Failed to add column ${columnName}: ${error.message}`);
  }
}

// Function to ensure the updates table has all required columns
export async function syncUpdatesTableSchema() {
  console.log('Syncing updates table schema...');
  
  try {
    const tableExists = await checkUpdatesTable();
    
    if (!tableExists) {
      console.log('Table does not exist. Creating updates table from scratch');
      await createUpdatesTable();
      return;
    }
    
    console.log('Table exists, checking columns...');
    
    // Check and add required columns if they don't exist
    const columns = [
      {name: 'publish_date', type: 'DATE', default: 'CURRENT_DATE'},
      {name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', default: 'CURRENT_TIMESTAMP'}
    ];
    
    for (const column of columns) {
      try {
        const added = await addColumnIfNotExists(column.name, column.type, column.default);
        if (added) {
          console.log(`Added missing column: ${column.name}`);
        } else {
          console.log(`Column already exists: ${column.name}`);
        }
      } catch (columnError) {
        console.error(`Error adding column ${column.name}:`, columnError);
        throw columnError;
      }
    }
    
    console.log('Updates table schema sync completed successfully');
  } catch (error) {
    console.error('Error in syncUpdatesTableSchema:', error);
    throw new Error(`Database schema sync failed: ${error.message}`);
  }
}

// Function to recreate the updates table (WARNING: This will delete all existing data)
export async function recreateUpdatesTable() {
  console.log('Recreating updates table...');
  
  // Drop the table if it exists
  await query('DROP TABLE IF EXISTS updates');
  
  // Create the table with the correct schema
  await createUpdatesTable();
  
  console.log('Updates table recreated successfully');
} 