import * as db from '../../lib/db';

export const dynamic = 'force-dynamic';
export const maxDuration = 10; // Set maximum duration to 10 seconds

// Override Node.js TLS rejection for development
// Note: This is not recommended for production, but works for development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function GET() {
  console.log('UPDATES-API: Starting database connection');
  
  try {
    // Get updates from the database
    const updates = await db.getUpdates(10);
    console.log(`UPDATES-API: Found ${updates.length} updates`);
    
    // Return updates as JSON
    const responseData = {
      success: true,
      updates: updates
    };
    
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error(`UPDATES-API ERROR: ${error.message}`);
    console.error(error.stack);
    
    // Return error response
    const errorResponse = {
      success: false,
      error: error.message,
      stack: error.stack
    };
    
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  }
}

export async function POST(request) {
  console.log('UPDATES-API: Processing POST request');
  
  try {
    // Parse request body
    const body = await request.json();
    const { title, content } = body;
    
    // Validate input
    if (!title || !content) {
      const validationError = {
        success: false,
        error: 'Title and content are required'
      };
      
      return new Response(JSON.stringify(validationError), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, max-age=0'
        }
      });
    }
    
    // Create new update
    const update = await db.createUpdate(title, content);
    console.log(`UPDATES-API: Created new update with ID ${update.id}`);
    
    // Return success response
    const successResponse = {
      success: true,
      message: 'Update created successfully',
      update: update
    };
    
    return new Response(JSON.stringify(successResponse), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error(`UPDATES-API ERROR: ${error.message}`);
    console.error(error.stack);
    
    // Return error response
    const errorResponse = {
      success: false,
      error: error.message,
      stack: error.stack
    };
    
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  }
} 