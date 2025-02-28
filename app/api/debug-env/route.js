import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Return environment variables (with sensitive parts masked)
  const envVars = {
    hasPostgresUrl: !!process.env.POSTGRES_URL,
    postgresUrlStart: process.env.POSTGRES_URL ? process.env.POSTGRES_URL.substring(0, 10) + '...' : null,
    nodeEnv: process.env.NODE_ENV,
  };
  
  return NextResponse.json(envVars);
} 