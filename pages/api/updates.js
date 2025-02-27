import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { title, content, date } = req.body;
      
      if (!title || !content) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      const updatesFilePath = path.join(process.cwd(), 'data', 'updates.json');
      
      // Create data directory if it doesn't exist
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
      }
      
      // Read existing updates or create empty array
      let updates = [];
      if (fs.existsSync(updatesFilePath)) {
        const fileContent = fs.readFileSync(updatesFilePath, 'utf8');
        updates = JSON.parse(fileContent);
      }
      
      // Add new update
      updates.unshift({
        id: Date.now().toString(),
        title,
        content,
        date,
      });
      
      // Write updates back to file
      fs.writeFileSync(updatesFilePath, JSON.stringify(updates, null, 2));
      
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error saving update:', error);
      return res.status(500).json({ error: 'Failed to save update' });
    }
  } else if (req.method === 'GET') {
    try {
      const updatesFilePath = path.join(process.cwd(), 'data', 'updates.json');
      
      if (!fs.existsSync(updatesFilePath)) {
        return res.status(200).json([]);
      }
      
      const fileContent = fs.readFileSync(updatesFilePath, 'utf8');
      const updates = JSON.parse(fileContent);
      
      return res.status(200).json(updates);
    } catch (error) {
      console.error('Error reading updates:', error);
      return res.status(500).json({ error: 'Failed to read updates' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
} 