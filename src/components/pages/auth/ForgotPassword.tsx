"use client";

import { forgotPasswordAction } from "@/actions/auth/forgotPasswordAction";
import FormAuthFooter from "@/components/Auth/FormAuthFooter";
import { Button, InputFields } from "@/components/shared";
import Card from "@/components/shared/Card";
import { useToast } from "@/context/ToastProvider";
import {
  ForgotPasswordSchema,
  forgotPasswordSchema,
} from "@/lib/zodSchema/zodAuthSchema/forgotPasswordSchema";
import { useActionState, useRef } from "react";

const dataInputsForgotPassword = [
  {
    floatingLabel: "Podaj swój email",
    name: "email",
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
    <div className="flex flex-col items-center justify-center p-4 h-full">

      <h1 className="text-xl text-center mb-4">Nie pamiętasz hasła?</h1>
      <Card className="min-w-[29rem] max-w-[52rem] w-full">
        <form action={formAction} className="space-y-4">
          <InputFields
            inputsData={dataInputsForgotPassword}
            errorMsg={state.errors}
          />

          <Button
            isLoading={isAction.current && isPending}
            message="Wyślij link"
            className="!text-base !px-20 !py-4 m-auto"
          />
        </form>
      </Card>

      <FormAuthFooter
        message="Masz konto?"
        messageLink="Zaloguj się"
        link="/login"
      />
    </div>

  );
};

export default ForgotPassword;
