"use client";

import { FC, FormEvent } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  loginFormSchema,
  TLoginFormValidator,
} from "@/validators/loginFormValidator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const LoginCard: FC = () => {
  const loginForm = useForm<TLoginFormValidator>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleProviderLogIn = async (provider: "github" | "google") => {
    await signIn(provider, { callbackUrl: "/" });
  };

  const handleCredentialsLogIn = async (values: TLoginFormValidator) => {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });
  };

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Log In to Continue</CardTitle>

        <CardDescription>Use your email or OAuth to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <Form {...loginForm}>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={loginForm.handleSubmit(handleCredentialsLogIn)}
            className="space-y-2.5"
          >
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full">
              Log In
            </Button>
          </form>
        </Form>
        <Separator />
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
          Do not have an account?&nbsp;
          <Link href="/register">
            <span className="text-sky-700 hover:underline">Register</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
