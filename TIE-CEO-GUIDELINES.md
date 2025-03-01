# TIE CEO Project Guidelines

## Code Stack & Architecture

### Frontend
- **Framework**: Next.js 14.0.3
- **UI**: Custom components with Tailwind CSS
- **State Management**: React hooks and context

### Backend
- **API Routes**: Next.js API routes
- **Database**: Supabase PostgreSQL
  - Database name: `supabase-gold-queen`
  - Connection: Direct PostgreSQL connection via `pg` client
  - **IMPORTANT**: Do NOT use `@vercel/postgres` as it uses Neon DB under the hood

### Authentication
- NextAuth.js for authentication

### Deployment
- **Repository**: GitHub (https://github.com/TieLove333/tieceo)
- **Hosting**: Vercel (auto-deploys from GitHub)

## Critical Rules & Guidelines

### 1. Deployment Workflow
- **ALWAYS** push changes to GitHub first
- **NEVER** deploy directly to Vercel
- Vercel will automatically deploy from the latest GitHub commits
- **ALWAYS** ask for permission before pushing to GitHub

### 2. Database Connections
- Use the `db.js` utility module for all database operations
- Do NOT use `@vercel/postgres` or any Neon DB related services
- All database tables should be created with proper error handling
- Database connection string is stored in environment variables

### 3. Environment Variables
- All sensitive information must be stored in environment variables
- Local development uses `.env.local`
- Production uses Vercel environment variables
- Never commit `.env.local` to GitHub

### 4. API Development
- All API routes should include proper error handling
- Use consistent response formats
- API routes should be RESTful when possible
- Include appropriate status codes in responses

### 5. Port Configuration
- Development server runs on port 3335
- Avoid running multiple instances of the development server

### 6. Code Organization
- Keep components modular and reusable
- Use proper directory structure:
  - `/app` - Next.js app router pages and layouts
  - `/app/api` - API routes
  - `/app/lib` - Utility functions and shared code
  - `/components` - Reusable UI components
  - `/public` - Static assets

### 7. Error Handling
- All database operations should have try/catch blocks
- Log errors to console with descriptive messages
- Return appropriate error responses to the client

### 8. Security
- Validate all user inputs
- Use parameterized queries for database operations
- Implement proper authentication checks for protected routes

## Common Commands

```bash
# Start development server on port 3335
npm run dev -- --port 3335

# Build for production
npm run build

# Run production build locally
npm start

# Git workflow
git add [files]
git commit -m "Descriptive message"
git push origin main
```

## Database Schema

### Updates Table
```sql
CREATE TABLE IF NOT EXISTS updates (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Important Notes
- The application uses TLS rejection override for development (`NODE_TLS_REJECT_UNAUTHORIZED='0'`)
- This should NOT be used in production
- Always check for database connection issues if API routes fail 