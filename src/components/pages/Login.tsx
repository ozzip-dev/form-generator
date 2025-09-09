"use client";

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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TLoginSchema } from "@/lib/schema/loginSchema";
import { ActionLogin } from "@/actions/actionsAuth/ActionLogin";
import InputsText from "@/components/inputs/inputsText";
import { setServerErrors } from "@/helpers/helpersValidation/setServerErrors";
import { useToast } from "@/hooks/use-toast";

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
        setServerErrors<TLoginSchema>(resp.error, setError);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputsText
        inputsData={dataInputsLogin}
        register={register}
        errorMsg={errors}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logowanie..." : "Zaloguj"}
      </button>
    </form>
  );
};

export default Login;
