"use client";

import { handleClientErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { useToast } from "@/hooks/useToast";
import {
  SignupSchema,
  signupSchema,
} from "@/lib/zodSchema/zodAuthSchema/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { handleNextRedirectError } from "@/helpers/helpersAuth/handleNextRedirectError";
import { Button, InputFields } from "@/components/shared";
import { signupAction } from "@/actions/auth/signupActionXX";

const dataInputsSignup = [
  {
    label: "Imię",
    name: "name",
    placeholder: "Jan",
    type: "text",
  },
  {
    label: "Email",
    name: "email",
    placeholder: "email@com",
    type: "email",
  },
  {
    label: "Hasło",
    name: "password",
    placeholder: "xxxxx",
    type: "text",
  },
  {
    label: "Powtórz hasło",
    name: "confirmPassword",
    placeholder: "xxxxx",
    type: "text",
  },
];

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const { toast } = useToast();

  const onSubmit = async (data: SignupSchema) => {
    const trimmedData = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
      confirmPassword: data.confirmPassword.trim(),
    };

    try {
      const resp = await signupAction(trimmedData);
      if (resp?.error) {
        handleClientErrors<SignupSchema>(resp.error, setError);
        return;
      }

      toast({
        title: "Sukces",
        description:
          "Jeżeli konto istnieje, dostałeś link do weryfikacji emaila",
        variant: "success",
      });
      reset();
    } catch (err: any) {
      handleNextRedirectError(err);

      toast({
        title: "Błąd rejestracji",
        description: err.message || "Coś poszło nie tak",
        variant: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Załóż konto</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 flex justify-center flex-col"
        >
          <InputFields
            inputsData={dataInputsSignup}
            register={register}
            errorMsg={errors}
          />
          <Button isLoading={isSubmitting} message="Załóż konto" />
        </form>

        <div className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
