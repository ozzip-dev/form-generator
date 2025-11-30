"use client";

import { signupAction } from "@/actions/auth/signupAction";
import { Button, InputFields } from "@/components/shared";
import { useToast } from "@/hooks/useToast";
import { signupSchema } from "@/lib/zodSchema/zodAuthSchema/signupSchema";
import { useActionState, useRef } from "react";

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

type State = {
  errors: Record<string, string[]>;
  inputs: Record<string, string> | null;
};
const initialState: State = { errors: {}, inputs: null };

const Signup = () => {
  const { toast } = useToast();
  const isAction = useRef(false);

  const signUpnUser = async (
    prevState: State,
    formData: FormData
  ): Promise<State> => {
    const data = Object.fromEntries(formData.entries()) as any;

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
    return { errors: {}, inputs: resp.success ? null : data };
  };

  const [state, formAction, isPending] = useActionState(
    signUpnUser,
    initialState
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Załóż konto</h1>

        <form action={formAction}>
          <InputFields
            inputsData={dataInputsSignup}
            errorMsg={state.errors}
            default={state?.inputs}
          />
          <Button
            isLoading={isAction.current && isPending}
            message="Załóż konto"
          />
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
