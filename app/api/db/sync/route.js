import { NextResponse } from 'next/server';
import { syncUpdatesTableSchema, recreateUpdatesTable } from '../../../lib/db';
import { getCurrentUser } from '../../../lib/supabase';

// API Route to sync the database schema
export async function GET(request) {
  try {
    // Check if user is authenticated
    const { data: user, error: userError } = await getCurrentUser();
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get URL parameters
    const { searchParams } = new URL(request.url);
    const recreate = searchParams.get('recreate') === 'true';
    
    if (recreate) {
      // WARNING: This will delete all existing data
      console.log('Recreating updates table...');
      try {
        await recreateUpdatesTable();
        return NextResponse.json({ 
          success: true, 
          message: 'Database table recreated successfully. All existing data has been deleted.'
        });
      } catch (recreateError) {
        console.error('Error recreating table:', recreateError);
        return NextResponse.json(
          { 
            error: 'Failed to recreate database table', 
            details: recreateError.message,
            stack: recreateError.stack
          },
          { status: 500 }
        );
      }
    } else {
      // Sync schema (safer option - doesn't delete data)
      console.log('Syncing database schema...');
      try {
        await syncUpdatesTableSchema();
        return NextResponse.json({ 
          success: true, 
          message: 'Database schema synchronized successfully'
        });
      } catch (syncError) {
        console.error('Error syncing schema:', syncError);
        return NextResponse.json(
          { 
            error: 'Failed to sync database schema', 
            details: syncError.message,
            stack: syncError.stack
          },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error('General error in DB sync API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process database sync request', 
        details: error.message,
        stack: error.stack
      },
      { status: 500 }
    );
  }
} 