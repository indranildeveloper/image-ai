import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db/drizzle";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHubProvider, GoogleProvider],
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
