import * as db from '../../lib/db';

export async function GET() {
  try {
    const rows = await db.getUpdates();
    
    return Response.json(rows);
  } catch (error) {
    console.error('Failed to fetch updates:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, content, category } = await request.json();
    
    if (!title || !content) {
      return Response.json({ error: 'Title and content are required' }, { status: 400 });
    }
    
    // Sanitize HTML content to prevent XSS
    const sanitizedContent = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Use the provided category or default to 'General'
    const updateCategory = category || 'General';
    
    const newUpdate = await db.createUpdate(title, sanitizedContent, updateCategory);
    
    return Response.json(newUpdate, { status: 201 });
  } catch (error) {
    console.error('Failed to create update:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
} 