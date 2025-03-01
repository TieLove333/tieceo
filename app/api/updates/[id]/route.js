import * as db from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function DELETE(request, { params }) {
  console.log('UPDATES-API: Processing DELETE request');
  
  try {
    // Extract update ID from params
    const updateId = params.id;
    
    if (!updateId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Update ID is required'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, max-age=0'
        }
      });
    }
    
    // Ensure updateId is a number
    const parsedUpdateId = parseInt(updateId, 10);
    
    if (isNaN(parsedUpdateId)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid update ID'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, max-age=0'
        }
      });
    }
    
    // Delete update from the database
    const result = await db.deleteUpdate(parsedUpdateId);
    
    if (!result) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Update not found'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, max-age=0'
        }
      });
    }
    
    // Return success response
    return new Response(JSON.stringify({
      success: true,
      message: 'Update deleted successfully',
      updateId: parsedUpdateId
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error(`UPDATES-API DELETE ERROR: ${error.message}`);
    console.error(error.stack);
    
    // Ensure a JSON response even for unexpected errors
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'An unexpected error occurred',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  }
} 