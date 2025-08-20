import { FC } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import RegisterCard from "@/features/auth/components/RegisterCard";

const RegisterPage: FC = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return <RegisterCard />;
};

export default RegisterPage;
