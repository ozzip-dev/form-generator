"use client";

import { signupAction } from "@/actions/auth/signupAction";
import { Button, Card, InputFields } from "@/components/shared";
import { useToast } from "@/context/ToastProvider";
import {
  signupSchema,
  SignupSchema,
} from "@/lib/zod-schema/zod-auth-schema/signupSchema";
import { useActionState, useRef } from "react";

const dataInputsSignup = [
  {
    floatingLabel: "Imię",
    name: "name",
    placeholder: "Jan",
    type: "text",
  },
  {
    floatingLabel: "Email",
    name: "email",
    placeholder: "email@com",
    type: "email",
  },
  {
    floatingLabel: "Hasło",
    name: "password",
    placeholder: "xxxxx",
    type: "text",
  },
  {
    floatingLabel: "Powtórz hasło",
    name: "confirmPassword",
    placeholder: "xxxxx",
    type: "text",
  },
];

type State = {
  errors: Record<string, string[]>;
  inputs: Record<string, string> | null;
};
const initialState: State = { errors: {}, inputs: null };

const Signup = () => {
  const { toast } = useToast();
  const isAction = useRef(false);

  const signUpUser = async (
    prevState: State,
    formData: FormData,
  ): Promise<State> => {
    const data = Object.fromEntries(formData.entries()) as SignupSchema;

    const validationResult = signupSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        errors: validationResult.error.formErrors.fieldErrors,
        inputs: data,
      };
    }

    isAction.current = true;
    const resp = await signupAction(validationResult.data);

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
    return { errors: {}, inputs: data };
  };

  const [state, formAction, isPending] = useActionState(
    signUpUser,
    initialState,
  );

  return (
    <div className="flex h-full flex-col items-center p-4 pt-24">
      <h1 className="mb-4 text-center text-xl">Zalóż konto</h1>
      <Card className="w-full min-w-[29rem] max-w-[52rem] !py-24">
        <form action={formAction}>
          <InputFields inputsData={dataInputsSignup} errorMsg={state.errors} />
          <Button
            isLoading={isAction.current && isPending}
            message="Załóż"
            className="m-auto !px-20 !py-4 !text-base"
          />
        </form>
      </Card>
    </div>
  );
};

export default Signup;
