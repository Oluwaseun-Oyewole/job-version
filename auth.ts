import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { generateCustomToken, verifyCustomToken } from "./utils/helper";

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!);

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    // error:"/error"
  },
  // debug: true,

  events: {
    // for fire and forget functions that runs when specific actions occur
    // events are purely for side effects like logging, database updates, analytics etc.

    async signIn({ user, account, profile }) {
      // Runs AFTER successful sign-in
    },

    async linkAccount({ user }) {
      // / Runs when an account is linked to a user
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async session({ session, token }) {
      const userJobs = await prisma.user.findFirst({
        where: {
          email: token?.email,
        },
        include: {
          jobs: true,
        },
      });
      if (session?.user) {
        session.user.exp = token.exp;
        session.user.jobs = userJobs?.jobs;
      }
      return {
        ...session,
        token: token.token,
        user: {
          ...session.user,
          jobs: userJobs?.jobs,
        },
      };
    },

    async jwt({ token, user, account, trigger, session }) {
      // Initial sign in
      if (user && account) {
        const customToken = await generateCustomToken(user, secret);
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          token: customToken,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        };
      }

      if (token.token) {
        try {
          await verifyCustomToken(token.customToken as string, secret);
          return token;
        } catch (error) {
          // Token expired, generate a new one
          const newCustomToken = await generateCustomToken(token.user, secret);
          return {
            ...token,
            token: newCustomToken,
          };
        }
      }
      return { ...token, ...user };
    },
  },
});
