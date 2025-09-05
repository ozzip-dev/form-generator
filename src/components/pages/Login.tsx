"use client";
import React, { useState } from "react";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { GoogleAuthButton } from "@/components/Auth/GoogleAuthButton";
import { InputField, CheckboxField } from "@/components/Auth/FormFields";
import { LoginFormValues, loginSchema } from "@/lib/schema/loginSchema";
import { authClient } from "@/lib/auth-client";
const Login = () => {
  const [pending, setPending] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    form.reset();
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      },
      {
        onRequest: () => {
          setPending(true);
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          console.log("error", ctx);
          toast({
            variant: "destructive",
            title: "something went wrong",
            description: ctx.error.message ?? "something went wrong",
          });
        },
      }
    );
    setPending(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Zaloguj się
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <InputField
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="kamil@ozzip.com"
                  type="email"
                  icon={<Mail className="h-5 w-5 text-muted-foreground" />}
                />

                <InputField
                  control={form.control}
                  name="password"
                  label="Hasło"
                  placeholder="••••••••"
                  type="password"
                  icon={<Lock className="h-5 w-5 text-muted-foreground" />}
                  showPasswordToggle={true}
                />

                <div className="flex items-center justify-between">
                  <CheckboxField
                    control={form.control}
                    name="rememberMe"
                    label="Zapamiętaj"
                  />

                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Nie pamiętasz hasła?
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={pending}>
                  {pending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Please wait...
                    </>
                  ) : (
                    <>
                      Zaloguj <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>

            <div className="flex gap-4 ">
              <GoogleAuthButton
                action="login"
                buttonText="Zaloguj się z Google"
                redirectTo="/dashboard"
              />
            </div>
            <div className="text-center text-sm">
              Nie masz konta?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Załóż nowe konto
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
