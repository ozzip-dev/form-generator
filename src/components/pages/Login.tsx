"use client";
import { ActionLogin } from "@/actions/actionsAuth/ActionLogin";
import { GoogleAuthButton } from "@/components/Auth/GoogleAuthButton";
import InputsText from "@/components/inputs/inputsText";
import { setServerErrors } from "@/helpers/helpersValidation/setServerErrors";
import { useToast } from "@/hooks/use-toast";
import { TLoginSchema, loginSchema } from "@/lib/schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const dataInputsLogin = [
  {
    label: "Email",
    name: "email",
    placeholder: "kamil@ozzip.com",
    type: "email",
    defaultValue: "test@example.com",
  },
  {
    label: "Hasło",
    name: "password",
    placeholder: "hasło",
    type: "password",
    defaultValue: "password1234",
  },
];



const Login = () => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TLoginSchema) => {
    try {
      const resp = await ActionLogin(null, data);
      if (resp?.error) {
        setServerErrors<TLoginSchema>(resp.error, setError);
        return;
      }
    } catch (err: any) {
      toast({
        title: "Błąd logowania",
        description: err.message || "Coś poszło nie tak",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="w-full max-w-md">
        <div className="border-none shadow-lg">
          <h1 className="space-y-1 text-2xl font-bold text-center">
            Zaloguj się
          </h1>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <InputsText
                inputsData={dataInputsLogin}
                register={register}
                errorMsg={errors}
              />

              <div className="flex items-center justify-between">
                {/* <CheckboxField
                    control={form.control}
                    name="rememberMe"
                    label="Zapamiętaj"
                  /> */}

                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Nie pamiętasz hasła?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-red-100 flex"
                disabled={isSubmitting}
              >
                {isSubmitting ? <>Please wait...</> : <>Zaloguj</>}
              </button>
            </form>
          </div>
          <div className="flex flex-col space-y-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
