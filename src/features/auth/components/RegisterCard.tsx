"use client";

import { FC } from "react";
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
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  registerFormValidator,
  TRegisterFormValidator,
} from "@/validators/registerFormValidator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const RegisterCard: FC = () => {
  const registerForm = useForm<TRegisterFormValidator>({
    resolver: zodResolver(registerFormValidator),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleProviderLogIn = async (provider: "github" | "google") => {
    await signIn(provider, { callbackUrl: "/" });
  };

  const handleCredentialsRegister = (values: TRegisterFormValidator) => {
    console.log(values);
  };

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Register to Continue</CardTitle>

        <CardDescription>Use your email or OAuth to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <Form {...registerForm}>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={registerForm.handleSubmit(handleCredentialsRegister)}
            className="space-y-2.5"
          >
            <FormField
              control={registerForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
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
              control={registerForm.control}
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
