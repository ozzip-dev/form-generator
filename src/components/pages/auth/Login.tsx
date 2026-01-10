"use client";

import { loginAction } from "@/actions/auth/loginAction";
import { Button, InputFields } from "@/components/shared";
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

const defaultValues = {
  email: "user@user.com",
  password: "123123123",
};

type State = { errors: Record<string, string[]>; inputs?: any };
const initialState: State = { errors: {}, inputs: null };

const Login = () => {
  const { toast } = useToast();
  useOneTimeToast(ToastsData);
  const isAction = useRef(false);

  const loginUser = async (
    prevState: State,
    formData: FormData
  ): Promise<State> => {
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
    initialState
  );

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full">
      <h1 className="text-2xl text-center mb-4">Zaloguj się</h1>

      <form
        action={formAction}
        className=" px-10 py-16 w-1/2 min-w-[31rem] max-w-[52rem]
    
         md:border md:border-default
        md:shadow-default
        md:bg-bg_dark
        md:rounded-md"
      >
        <InputFields
          inputsData={dataInputsLogin}
          errorMsg={state.errors}
          // default={defaultValues}
        />
        <div className="text-end my-4">
          <Link
            href="/forgot-password"
            className="text-accent_dark hover:underline hover:decoration-accent_dark"
          >
            Nie pamiętasz hasła?
          </Link>
        </div>
        <div className="flex justify-center">
          <Button
            isLoading={isAction.current && isPending}
            message="Zaloguj"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
