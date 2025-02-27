import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    // Log the entire request for debugging
    console.log('Received request body:', await request.text());

    const data = await request.json();
    const { title, content, date } = data;
    
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    // Use a public directory that's writable in production
    const updatesFilePath = path.join(process.cwd(), 'public', 'data', 'updates.json');
    
    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'public', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Read existing updates or create empty array
    let updates = [];
    if (fs.existsSync(updatesFilePath)) {
      const fileContent = fs.readFileSync(updatesFilePath, 'utf8');
      updates = JSON.parse(fileContent);
    }
    
    // Add new update
    const newUpdate = {
      id: Date.now().toString(),
      title,
      content,
      date,
    };
    updates.unshift(newUpdate);
    
    // Write updates back to file
    fs.writeFileSync(updatesFilePath, JSON.stringify(updates, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      update: newUpdate 
    });
  } catch (error) {
    console.error('Error saving update:', error);
    return NextResponse.json(
      { error: 'Failed to save update: ' + error.message }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const updatesFilePath = path.join(process.cwd(), 'public', 'data', 'updates.json');
    
    if (!fs.existsSync(updatesFilePath)) {
      return NextResponse.json([]);
    }
    
    const fileContent = fs.readFileSync(updatesFilePath, 'utf8');
    const updates = JSON.parse(fileContent);
    
    return NextResponse.json(updates);
  } catch (error) {
    console.error('Error reading updates:', error);
    return NextResponse.json({ error: 'Failed to read updates: ' + error.message }, { status: 500 });
  }
} 