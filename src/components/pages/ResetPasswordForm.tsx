"use client";

import { handleClientErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { useToast } from "@/hooks/useToast";
import {
  TResetPasswordShema,
  resetPasswordSchema,
} from "@/lib/zodSchema/zodAuthSchema/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputFields from "../inputs/InputFields";
import FormAuthFooter from "../Auth/FormAuthFooter";
import { handleNextRedirectError } from "@/helpers/helpersAuth/handleNextRedirectError";
import { ActionResetPassword } from "@/actions/auth/ActionResetPassword";
import Button from "../ui/buttons/Button";

const dataInputsResetPassword = [
  {
    label: "Nowe hasło",
    name: "password",
    placeholder: "XXXX",
    type: "password",
  },
  {
    label: "Powtórz hasło",
    name: "confirmPassword",
    placeholder: "XXXX",
    type: "password",
  },
];

const ResetPasswordForm = ({ token }: { token: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TResetPasswordShema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { toast } = useToast();

  const onSubmit = async (data: TResetPasswordShema) => {
    const trimmedData = {
      password: data.password.trim(),
      confirmPassword: data.confirmPassword.trim(),
    };

    try {
      const resp = await ActionResetPassword({ ...trimmedData, token });
      if (resp?.error) {
        handleClientErrors<TResetPasswordShema>(resp.error, setError);
        return;
      }
    } catch (err: any) {
      handleNextRedirectError(err);

      toast({
        title: "Błąd zmiany hasła",
        description: err.message || "Coś poszło nie tak",
        variant: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Zmień hasło</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputFields
            inputsData={dataInputsResetPassword}
            register={register}
            errorMsg={errors}
          />
          <Button isLoading={isSubmitting} message="Zmień hasło" />
        </form>

        <FormAuthFooter
          message="Pamiętasz hasło?"
          messageLink="Zaloguj się"
          link="/login"
        />
      </div>
    </div>
  );
};

export default ResetPasswordForm;
