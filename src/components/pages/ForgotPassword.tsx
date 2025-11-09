"use client";

import { ForgotPasswordAction } from "@/actions/auth/ForgotPasswordAction";
import { handleClientErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { useToast } from "@/hooks/useToast";
import {
  ForgotPasswordSchema,
  forgotPasswordSchema,
} from "@/lib/zodSchema/zodAuthSchema/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormAuthFooter from "../Auth/FormAuthFooter";
import InputFields from "../inputs/InputFields";
import Button from "../ui/buttons/Button";

const dataInputsForgotPassword = [
  {
    label: "Podaj swój email",
    name: "email",
    placeholder: "kamil@ozzip.com",
    type: "email",
  },
];

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { toast } = useToast();

  const onSubmit = async (data: ForgotPasswordSchema) => {
    const trimmedData = {
      email: data.email.trim(),
    };

    try {
      const resp = await ForgotPasswordAction(trimmedData);

      if (resp?.error) {
        handleClientErrors<ForgotPasswordSchema>(resp.error, setError);
        return;
      }

      toast({
        title: "Sukces",
        description: "Jeżeli konto istnieje, dostałeś link do resetu hasła",
        variant: "info",
      });
      reset();
    } catch (err: any) {
      toast({
        title: "Błąd. Spróbuj ponownie",
        description: err.message,
        variant: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Nie pamiętasz hasła?</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputFields
            inputsData={dataInputsForgotPassword}
            register={register}
            errorMsg={errors}
          />

          <Button isLoading={isSubmitting} message="Wyślij link" />
        </form>

        <FormAuthFooter
          message="Masz konto?"
          messageLink="Zaloguj się"
          link="/login"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
