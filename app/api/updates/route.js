import { NextResponse } from 'next/server';

// In-memory storage for updates (will reset on each deployment)
let updates = [];

export async function POST(request) {
  try {
    const data = await request.json();
    const { title, content, date } = data;
    
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    // Create new update
    const newUpdate = {
      id: Date.now().toString(),
      title,
      content,
      date,
    };
    
    // Add to the beginning of updates array
    updates.unshift(newUpdate);
    
    return NextResponse.json({ 
      success: true, 
      update: newUpdate 
    });
  } catch (error) {
    console.error('Error saving update:', error);
    return NextResponse.json(
      { error: 'Failed to save update', details: error.message }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json(updates);
  } catch (error) {
    console.error('Error reading updates:', error);
    return NextResponse.json(
      { error: 'Failed to read updates', details: error.message }, 
      { status: 500 }
    );
  }
} 