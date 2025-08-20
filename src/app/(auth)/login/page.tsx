import { FC } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginCard from "@/features/auth/components/LoginCard";

const LoginPage: FC = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return <LoginCard />;
};

export default LoginPage;
