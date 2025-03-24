import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {User} from "@/models/user.model";
import NextAuth from "next-auth";
import { connectDB } from "./DB";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const email = credentials.email as string;
        const password = credentials.password as string;
        if (!email || !password) {
          return null;
        }
        const user = await User.findOne({ email });
        if (!user) {
          return null;
        }
        const isValid = await bcrypt.compare(password, user.password);
        const userdata = {
          id: user._id.toString(),
          username: user.username,
          isVerified: user.isVerified,
          isAcceptingMessage: user.isAcceptingMessage,
        };
        if (!isValid) {
          return null;
        }
        return userdata;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessage = user.isAcceptingMessage;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.isAcceptingMessage = token.isAcceptingMessage as boolean;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 14 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
