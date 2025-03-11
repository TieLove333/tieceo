import { NextResponse } from 'next/server';
import { addMissingColumns } from '../../../lib/supabase';

export async function GET() {
  try {
    console.log('Direct database fix requested');
    const result = await addMissingColumns();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Database columns added successfully'
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to add database columns',
        error: result.error
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in direct fix API:', error);
    return NextResponse.json({
      success: false,
      message: 'Error fixing database',
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
} 