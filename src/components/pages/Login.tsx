"use client";

import { ActionLogin } from "@/actions/auth/ActionLogin";
import InputFields from "@/components/inputs/InputFields";
import { handleNextRedirectError } from "@/helpers/helpersAuth/handleNextRedirectError";
import { handleClientErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { ModelToast, useOneTimeToast } from "@/hooks/useOneTimeToast";
import { useToast } from "@/hooks/useToast";
import {
  loginSchema,
  TLoginSchema,
} from "@/lib/zodShema/zodAuthShema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import ButtonSubmit from "../ui/buttons/ButtonSubmit";

const ToastsData: ModelToast[] = [
  {
    param: "logout",
    expectedValue: "success",
    title: "Wylogowano",
    description: "Zostałeś wylogowany",
    variant: "info",
  },
  {
    param: "resetPassword",
    expectedValue: "success",
    title: "Zmiana hasła",
    description: "Twoje hasło zostało zmienione. Możesz się zalogować",
    variant: "info",
  },
];

const dataInputsLogin = [
  {
    label: "Email",
    name: "email",
    placeholder: "kamil@ozzip.com",
    type: "email",
    defaultValue: "krzysztofkroladam@gmail.com",
  },
  {
    label: "Hasło",
    name: "password",
    placeholder: "hasło",
    type: "password",
    defaultValue: "aaaaaaaa",
  },
];

const Login = () => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  useOneTimeToast(ToastsData);

  const onSubmit = async (data: TLoginSchema) => {
    const trimmedData = {
      email: data.email.trim(),
      password: data.password.trim(),
    };

    try {
      const resp = await ActionLogin(trimmedData);

      if (resp?.error) {
        handleClientErrors<TLoginSchema>(resp.error, setError);
        return;
      }

      if (resp?.error?.email?.type === "auth") {
        toast({
          title: "Błąd logowania",
          description: resp.error.email.message || "Coś poszło nie tak",
          variant: "error",
        });

        return;
      }
    } catch (err: any) {
      handleNextRedirectError(err);

      toast({
        title: "Błąd logowania",
        description: err.message || "Coś poszło nie tak",
        variant: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Zaloguj się</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputFields
            inputsData={dataInputsLogin}
            register={register}
            errorMsg={errors}
          />
          <div className="flex items-center justify-end">
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline hover:decoration-blue-600"
            >
              Nie pamiętasz hasła?
            </Link>
          </div>
          <ButtonSubmit isSubmitting={isSubmitting} message="Zaloguj" />
        </form>
      </div>
    </div>
  );
};

export default Login;
