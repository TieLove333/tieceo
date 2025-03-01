# TIE CEO - $1B Solo SaaS Challenge

## ⚠️ IMPORTANT: Project Guidelines ⚠️

**BEFORE MAKING ANY CHANGES, read the [TIE-CEO-GUIDELINES.md](./TIE-CEO-GUIDELINES.md) document.**

This document contains critical information about:
- The project's code stack and architecture
- Critical rules and guidelines for development
- Database connection details (Supabase, not Neon)
- Environment variable management
- Deployment workflow

### Critical Rules Summary:
1. Development server runs on port 3335
2. Use Supabase PostgreSQL, NOT Neon DB
3. ALWAYS ask for permission before pushing to GitHub
4. Use db.js utility for database operations

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3335](http://localhost:3335) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
