"use client";

import { ActionLogin } from "@/actions/actionsAuth/ActionLogin";
import InputsText from "@/components/inputs/inputsText";
import { useToast } from "@/context/ContextProvider";
import { handleFormErrors } from "@/helpers/helpersValidation/handleFormErrors";
import {
  loginSchema,
  TLoginSchema,
} from "@/lib/zodShema/zodAuthShema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormAuthFooter from "../Auth/FormAuthFooter";
import { GoogleAuthButton } from "../Auth/GoogleAuthButton";
import ButtonSubmit from "../ui/ButtonSubmit";

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
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (searchParams.get("logout") === "success") {
      toast({
        title: "Wylogowanie",
        description: "Zostałeś pomyślnie wylogowany",
        variant: "info",
      });
    }

    if (searchParams.get("resetPassword") === "success") {
      toast({
        title: "Hasło zostało zresetowane!",
        description:
          "Twoje hasło zostało pomyślnie zmienione. Możesz się zalogować",
        variant: "info",
      });
    }
  }, [searchParams]);

  const onSubmit = async (data: TLoginSchema) => {
    try {
      const resp = await ActionLogin(data);

      if (resp?.error) {
        handleFormErrors<TLoginSchema>(resp.error, setError);
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
      const digest = err?.digest;
      const message = err?.message;
      if (
        digest === "NEXT_REDIRECT" ||
        (typeof digest === "string" && digest.includes("NEXT_REDIRECT")) ||
        message === "NEXT_REDIRECT"
      ) {
        throw err;
      }

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
          <InputsText
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
          <ButtonSubmit isSubmitting={isSubmitting} text="Zaloguj" />

          <div className="flex gap-4 ">
            <GoogleAuthButton
              action="login"
              buttonText="Zaloguj się z Google"
              redirectTo="/dashboard"
            />
          </div>

          <FormAuthFooter
            text="Nie masz konta?"
            textLink="Założ konto"
            link="/signup"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
