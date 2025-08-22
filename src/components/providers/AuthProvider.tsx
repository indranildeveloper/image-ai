import { FC } from "react";
import { SessionProvider } from "next-auth/react";
import { AuthProviderProps } from "@/interfaces/AuthProviderProps";
import { auth } from "@/auth";

const AuthProvider: FC<AuthProviderProps> = async ({ children }) => {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
