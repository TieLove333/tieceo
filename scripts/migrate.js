import { createClient } from '@vercel/postgres';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function migrate() {
  try {
    const client = createClient();
    await client.connect();
    
    await client.sql`
      CREATE TABLE IF NOT EXISTS updates (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        category VARCHAR(50) DEFAULT 'General',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const checkCategoryColumn = await client.sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'updates' AND column_name = 'category';
    `;

    if (checkCategoryColumn.rowCount === 0) {
      console.log('Adding category column to updates table...');
      await client.sql`
        ALTER TABLE updates 
        ADD COLUMN category VARCHAR(50) DEFAULT 'General';
      `;
      console.log('Category column added successfully');
    } else {
      console.log('Category column already exists');
    }

    console.log('Migration successful');
    await client.end();
  } catch (error) {
    console.error('Migration failed:', error);
    console.error('Error details:', error.message);
  } finally {
    process.exit(0);
  }
}

migrate(); 