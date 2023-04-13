import NextAuth, { NextAuthOptions } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT as string,
      clientSecret: process.env.AUTH0_SECRET as string,
      issuer: process.env.AUTH0_ISSUER as string,
    }),
  ],
  debug: true
};

export default NextAuth(authOptions);
