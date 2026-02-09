"use client";

import { resetPasswordAction } from "@/actions/auth/resetPasswordAction";
import FormAuthFooter from "@/components/auth/FormAuthFooter";
import { Button, InputFields } from "@/components/shared";
import { useToast } from "@/context/ToastProvider";
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from "@/lib/zod-schema/zod-auth-schema/resetPasswordSchema";
import { useActionState, useRef } from "react";

const dataInputsResetPassword = [
  {
    floatingLabel: "Nowe hasło",
    name: "password",
    placeholder: "XXXX",
    type: "password",
  },
  {
    floatingLabel: "Powtórz hasło",
    name: "confirmPassword",
    placeholder: "XXXX",
    type: "password",
  },
];

type State = {
  errors: Record<string, string[]>;
  inputs: Record<string, string> | null;
};
const initialState: State = { errors: {}, inputs: null };

const ResetPasswordForm = ({ token }: { token: string }) => {
  const { toast } = useToast();
  const isAction = useRef(false);

  const resetPassword = async (
    prevState: State,
    formData: FormData
  ): Promise<any> => {
    const data = Object.fromEntries(formData.entries()) as ResetPasswordSchema;

    const validationResult = resetPasswordSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        errors: validationResult.error.formErrors.fieldErrors,
        inputs: data,
      };
    }

    isAction.current = true;
    const resp = await resetPasswordAction({ ...validationResult.data, token });

    if (resp?.validationErrors) {
      return { errors: resp.validationErrors, inputs: data };
    }

    if (resp?.catchError) {
      toast({
        title: "Błąd zmiany hasła",
        description: resp.catchError || "Coś poszło nie tak",
        variant: "error",
      });
    }
    isAction.current = false;
    return { errors: {}, inputs: data };
  };

  const [state, formAction, isPending] = useActionState(
    resetPassword,
    initialState
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Zmień hasło</h1>

        <form action={formAction}>
          {" "}
          <InputFields
            inputsData={dataInputsResetPassword}
            errorMsg={state.errors}
            default={state?.inputs}
          />
          <Button
            isLoading={isAction.current && isPending}
            message="Zmień hasło"
          />
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
