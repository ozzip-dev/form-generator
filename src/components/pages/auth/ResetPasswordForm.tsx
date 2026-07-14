"use client";

import { resetPasswordAction } from "@/actions/auth/resetPasswordAction";
import FormAuthFooter from "@/components/auth/FormAuthFooter";
import { Button, Card, InputFields } from "@/components/shared";
import { useToast } from "@/context/ToastProvider";
import { InputData } from "@/enums";
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from "@/lib/zod-schema/zod-auth-schema/resetPasswordSchema";
import { useActionState, useRef } from "react";

const dataInputsResetPassword: InputData[] = [
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
    formData: FormData,
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
    initialState,
  );

  return (
    <div className="flex h-full flex-col items-center justify-center p-4 pt-24">
      <h1 className="text-center text-2xl font-semibold">Zmień hasło</h1>

      <Card className="w-full min-w-[29rem] max-w-[52rem]">
        <form action={formAction}>
          {" "}
          <InputFields
            inputsData={dataInputsResetPassword}
            errorMsg={state.errors}
            default={state?.inputs}
          />
          <Button
            type="submit"
            isLoading={isAction.current && isPending}
            message="Zmień hasło"
            className="m-auto !px-20 !py-4 !text-base"
          />
        </form>
      </Card>

      <FormAuthFooter
        message="Pamiętasz hasło?"
        messageLink="Zaloguj się"
        link="/login"
      />
    </div>
  );
};

export default ResetPasswordForm;
