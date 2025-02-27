import { NextResponse } from 'next/server';

// In-memory storage for updates (will reset on each deployment)
let updates = [];

export async function POST(request) {
  try {
    const data = await request.json();
    const { title, content, date } = data;
    
    console.log('Received update data:', { title, content, date });

    if (!title || !content) {
      console.error('Missing required fields');
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
    
    console.log('Created update:', newUpdate);

    return NextResponse.json({ 
      success: true, 
      update: newUpdate 
    }, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error in POST route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to save update', 
        details: error.message 
      }, 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json(updates, {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error in GET route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to read updates', 
        details: error.message 
      }, 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
} 