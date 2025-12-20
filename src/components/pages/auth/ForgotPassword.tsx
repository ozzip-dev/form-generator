"use client";

import { forgotPasswordAction } from "@/actions/auth/forgotPasswordAction";
import FormAuthFooter from "@/components/Auth/FormAuthFooter";
import { Button, InputFields } from "@/components/shared";
import { useToast } from "@/context/ToastProvider";
import {
  ForgotPasswordSchema,
  forgotPasswordSchema,
} from "@/lib/zodSchema/zodAuthSchema/forgotPasswordSchema";
import { useActionState, useRef } from "react";

const dataInputsForgotPassword = [
  {
    label: "Podaj swój email",
    name: "email",
    placeholder: "kamil@ozzip.com",
    type: "email",
  },
];

type State = {
  errors: Record<string, string[]>;
  inputs: Record<string, string> | null;
};
const initialState: State = { errors: {}, inputs: null };

const ForgotPassword = () => {
  const { toast } = useToast();
  const isAction = useRef(false);

  const sendForgotPasswordLink = async (
    prevState: State,
    formData: FormData
  ): Promise<State> => {
    const data = Object.fromEntries(formData.entries()) as ForgotPasswordSchema;

    const validationResult = forgotPasswordSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        errors: validationResult.error.formErrors.fieldErrors,
        inputs: data,
      };
    }

    isAction.current = true;
    const resp = await forgotPasswordAction(validationResult.data);

    if (resp?.validationErrors) {
      return { errors: resp.validationErrors, inputs: data };
    }

    if (resp.catchError) {
      toast({
        title: "Błąd rejestracji",
        description: resp?.catchError || "Coś poszło nie tak",
        variant: "error",
      });
    }

    if (resp.success) {
      toast({
        title: "Sukces",
        description:
          "Jeżeli konto istnieje, dostałeś link do weryfikacji emaila",
        variant: "success",
      });
    }

    isAction.current = false;
    return { errors: {}, inputs: resp.success ? null : data };
  };

  const [state, formAction, isPending] = useActionState(
    sendForgotPasswordLink,
    initialState
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Nie pamiętasz hasła?</h1>
        <form action={formAction} className="space-y-4">
          <InputFields
            inputsData={dataInputsForgotPassword}
            errorMsg={state.errors}
            default={state?.inputs}
          />

          <Button
            isLoading={isAction.current && isPending}
            message="Wyślij link"
          />
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
