import NextAuth from 'next-auth';
import { authOptions } from '../../../lib/auth';

// Create the handler using the imported authOptions
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 