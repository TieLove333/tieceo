import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

export async function DELETE(request, { params }) {
  console.log('UPDATES-API: Processing DELETE request');
  
  try {
    // Extract update ID from params
    const updateId = params.id;
    
    if (!updateId) {
      return Response.json({
        success: false,
        error: 'Update ID is required'
      }, { status: 400 });
    }
    
    // Ensure updateId is a number
    const parsedUpdateId = parseInt(updateId, 10);
    
    if (isNaN(parsedUpdateId)) {
      return Response.json({
        success: false,
        error: 'Invalid update ID'
      }, { status: 400 });
    }
    
    // Delete update from the database
    const result = await sql`
      DELETE FROM updates 
      WHERE id = ${parsedUpdateId} 
      RETURNING *
    `;
    
    if (result.rowCount === 0) {
      return Response.json({
        success: false,
        error: 'Update not found'
      }, { status: 404 });
    }
    
    // Return success response
    return Response.json({
      success: true,
      message: 'Update deleted successfully',
      updateId: parsedUpdateId
    });
  } catch (error) {
    console.error(`UPDATES-API DELETE ERROR: ${error.message}`);
    console.error(error.stack);
    
    // Ensure a JSON response even for unexpected errors
    return Response.json({
      success: false,
      error: error.message || 'An unexpected error occurred'
    }, { status: 500 });
  }
} 