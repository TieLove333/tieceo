import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Replace this with your actual authentication logic
        if (credentials.username === process.env.ADMIN_USERNAME && 
            credentials.password === process.env.ADMIN_PASSWORD) {
          return { 
            id: '1', 
            name: 'Admin', 
            email: 'admin@example.com',
            isAdmin: true 
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.isAdmin = token.isAdmin;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
      }
      return token;
    }
  },
  pages: {
    signIn: '/login'
  }
});

export { handler as GET, handler as POST }; 