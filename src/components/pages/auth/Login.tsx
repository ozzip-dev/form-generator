"use client";

import { loginAction } from "@/actions/auth/loginAction";
import { Button, InputFields } from "@/components/shared";
import Card from "@/components/shared/Card";
import { useToast } from "@/context/ToastProvider";
import { ModelToast, useOneTimeToast } from "@/hooks/useOneTimeToast";
import {
  LoginSchema,
  loginSchema,
} from "@/lib/zodSchema/zodAuthSchema/loginSchema";
import Link from "next/link";
import { useActionState, useRef } from "react";

const ToastsData: ModelToast[] = [
  {
    param: "logout",
    expectedValue: "success",
    title: "Wylogowano",
    description: "Zostałeś wylogowany",
    variant: "info",
  },
  {
    param: "resetPassword",
    expectedValue: "success",
    title: "Zmiana hasła",
    description: "Twoje hasło zostało zmienione. Możesz się zalogować",
    variant: "info",
  },
];

const dataInputsLogin = [
  {
    floatingLabel: "Email",
    name: "email",
    type: "email",
    defaultValue: "user@user.com",
  },
  {
    floatingLabel: "Hasło",
    name: "password",
    type: "password",
    defaultValue: "123123123",
  },
];


type State = { errors: Record<string, string[]>; inputs?: any };
const initialState: State = { errors: {}, inputs: null };

const Login = () => {
  const { toast } = useToast();
  useOneTimeToast(ToastsData);
  const isAction = useRef(false);

  const loginUser = async (_: State, formData: FormData): Promise<State> => {


    const data = Object.fromEntries(formData.entries()) as LoginSchema;

    const validationResult = loginSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        errors: validationResult.error.formErrors.fieldErrors,
        inputs: data,
      };
    }

    isAction.current = true;
    const resp = await loginAction(data);

    if (resp?.validationErrors) {
      return { errors: resp.validationErrors, inputs: data };
    }

    if (resp?.catchError) {
      toast({
        title: "Błąd logowania",
        description: resp.catchError || "Coś poszło nie tak",
        variant: "error",
      });
      return { errors: {}, inputs: data };
    }

    isAction.current = false;

    return { errors: {}, inputs: data };
  };

  const [state, formAction, isPending] = useActionState(
    loginUser,
    initialState,
  );

  return (
    <div className="flex flex-col items-center p-4 pt-24 h-full">
      <h1 className="text-xl text-center mb-4">Zaloguj się</h1>
      <Card className="min-w-[29rem] max-w-[52rem] w-full !py-24">
        <form
          action={formAction} >
          <InputFields
            inputsData={dataInputsLogin}
            errorMsg={state.errors}
          />
          <div className="my-4">
            <Link
              href="/forgot-password"
              className="text-accent_dark text-sm hover:underline hover:decoration-accent_dark"
            >
              Nie pamiętasz hasła?
            </Link>
          </div>

          <Button
            isLoading={isAction.current && isPending}
            message="Zaloguj"
            type="submit"
            className="!text-base !px-20 !py-4 m-auto"
          />

        </form>
      </Card>

    </div>
  );
};

export default Login;
