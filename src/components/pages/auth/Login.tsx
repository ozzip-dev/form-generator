"use client";

import { useActionState, useRef } from "react";
import Link from "next/link";
import { loginAction } from "@/actions/auth/loginAction";
import { Button, Card, InputFields } from "@/components/shared";
import { useToast } from "@/context/ToastProvider";
import { isTestEnv } from "@/helpers/appHelpers";
import { ModelToast, useOneTimeToast } from "@/hooks/useOneTimeToast";
import {
  LoginSchema,
  loginSchema,
} from "@/lib/zod-schema/zod-auth-schema/loginSchema";
import { InputData, InputType } from "@/enums";
import AuthForm from "@/components/auth/AuthForm";

const ToastsData: ModelToast[] = [
  {
    param: "login",
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

const dataInputsLogin: InputData[] = [
  {
    floatingLabel: "Email",
    name: "email",
    type: InputType.EMAIL,
    defaultValue: isTestEnv() ? "moderator@moderator.com" : undefined,
  },
  {
    floatingLabel: "Hasło",
    name: "password",
    type: "password",
    defaultValue: isTestEnv() ? "123123123" : undefined,
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
    <AuthForm
      header="Zaloguj się"
      footerMessage="Nie masz konta?"
      footerLink="Skontaktuj się z administratorem aplikacji"
      footerUrl="/admin-contact"
    >
      <form action={formAction}>
        <InputFields inputsData={dataInputsLogin} errorMsg={state.errors} />
        <div className="my-4">
          <Link
            href="/forgot-password"
            className="text-xs text-accent_dark hover:underline hover:decoration-accent_dark"
          >
            Nie pamiętasz hasła?
          </Link>
        </div>

        <Button
          isLoading={isAction.current && isPending}
          message="Zaloguj"
          type="submit"
          className="m-auto !px-20 !py-4 !text-base"
        />
      </form>
    </AuthForm>
  );
};

export default Login;
