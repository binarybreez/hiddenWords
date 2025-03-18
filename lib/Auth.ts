import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import NextAuth from "next-auth";
import { connectDB } from "./DB";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        try {
          const user = await User.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.email },
            ],
          });
          if (!user) throw new Error("User not found");
          if (!user.isVerified)
            throw new Error("User not verified verify your email");
          const isValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          const userdata = {
            id: user._id.toString(),
            username: user.username,
            isVerified: user.isVerified,
            isAcceptingMessage: user.isAcceptingMessage,
          };
          if (isValid) {
            return userdata;
          } else {
            throw new Error("Invalid password");
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          throw new error();
        }
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
      if (token) {
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
    maxAge:30*14*60*60
  },
  secret: process.env.NEXTAUTH_SECRET,
});
