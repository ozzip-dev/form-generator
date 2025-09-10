"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TLoginSchema } from "@/lib/schema/loginSchema";
import { ActionLogin } from "@/actions/actionsAuth/ActionLogin";
import InputsText from "@/components/inputs/inputsText";
import { handleFormErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { GoogleAuthButton } from "../Auth/GoogleAuthButton";
import Loader from "../ui/Loader";
import ButtonSubmitt from "../ui/ButtonSubmitt";

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
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    try {
      const resp = await ActionLogin(data);

      if (resp?.error?.email?.type === "auth") {
        toast({
          title: "Błąd logowania",
          description: resp.error.email.message,
          variant: "destructive",
        });
        return;
      }

      if (resp?.error) {
        handleFormErrors<TLoginSchema>(resp.error, setError);
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
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <h1>Logowanie</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputsText
          inputsData={dataInputsLogin}
          register={register}
          errorMsg={errors}
        />

        <ButtonSubmitt isSubmitting={isSubmitting} text="Zaloguj" />

        <div className="flex gap-4 ">
          <GoogleAuthButton
            action="login"
            buttonText="Zaloguj się z Google"
            redirectTo="/dashboard"
          />
        </div>
        <div className="flex items-center justify-between">
          <Link
            href="/forgot-password"
            className="link intent-info variant-ghost text-sm"
          >
            Nie pamiętam hasła
          </Link>
        </div>
        <div className="bg-muted rounded-(--radius) border p-3">
          <p className="text-accent-foreground text-center text-sm">
            Nie masz konta?<Link href="/signup">Załóż konto</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
