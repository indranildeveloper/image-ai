import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db/drizzle";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHubProvider],
  adapter: DrizzleAdapter(db),
});
