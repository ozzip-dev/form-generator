"use client";

import { forgotPasswordAction } from "@/actions/auth/forgotPasswordAction";
import AuthForm from "@/components/auth/AuthForm";
import { Button, Card, InputFields } from "@/components/shared";
import { useToast } from "@/context/ToastProvider";
import { InputType } from "@/enums";
import {
  ForgotPasswordSchema,
  forgotPasswordSchema,
} from "@/lib/zod-schema/zod-auth-schema/forgotPasswordSchema";
import { useActionState, useRef } from "react";

const dataInputsForgotPassword = [
  {
    floatingLabel: "Podaj swój email",
    name: "email",
    type: InputType.EMAIL,
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
    formData: FormData,
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
          "Jeżeli konto istnieje, wysłano link do weryfikacji emaila",
        variant: "success",
      });
    }

    isAction.current = false;
    return { errors: {}, inputs: resp.success ? null : data };
  };

  const [state, formAction, isPending] = useActionState(
    sendForgotPasswordLink,
    initialState,
  );

  return (
    <AuthForm
      header="Nie pamiętasz hasła?"
      footerMessage="Masz konto?"
      footerLink="Zaloguj się"
      footerUrl="/login"
    >
      <form action={formAction} className="space-y-4">
        <InputFields
          inputsData={dataInputsForgotPassword}
          errorMsg={state.errors}
        />

        <Button
          type="submit"
          isLoading={isAction.current && isPending}
          message="Wyślij link"
          className="m-auto !px-20 !py-4 !text-base"
        />
      </form>
    </AuthForm>
  );
};

export default ForgotPassword;
