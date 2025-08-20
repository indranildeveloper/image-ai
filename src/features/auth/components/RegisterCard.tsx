"use client";

import { FC } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const RegisterCard: FC = () => {
  const handleProviderLogIn = async (provider: "github" | "google") => {
    await signIn(provider, { callbackUrl: "/" });
  };

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Register to Continue</CardTitle>

        <CardDescription>Use your email or OAuth to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <div className="flex flex-col gap-y-2.5">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={() => handleProviderLogIn("github")}
          >
            <FaGithub className="mr-1 size-5" />
            Continue with GitHub
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={() => handleProviderLogIn("google")}
          >
            <FcGoogle className="mr-1 size-5" />
            Continue with Google
          </Button>
        </div>
        <p className="text-muted-foreground text-xs">
          Already have an account?&nbsp;
          <Link href="/login">
            <span className="text-sky-700 hover:underline">Log In</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default RegisterCard;
