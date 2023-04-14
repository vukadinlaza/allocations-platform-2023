import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import jwt from "jsonwebtoken"


export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT as string,
      clientSecret: process.env.AUTH0_SECRET as string,
      issuer: process.env.AUTH0_ISSUER as string,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL as string,
    secret: process.env.SUPABASE_KEY as string,
  }),
  callbacks: {
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        }
        session.supabaseAccessToken = jwt.sign(payload, signingSecret)
      }
      return session
    },
  },
  debug: true
};

export default NextAuth(authOptions);
