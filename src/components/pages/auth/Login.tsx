"use client";

import { loginAction } from "@/actions/auth/loginAction";
import { Button, InputFields } from "@/components/shared";
import { handleNextRedirectError } from "@/helpers/helpersAuth/handleNextRedirectError";
import { handleClientErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { ModelToast, useOneTimeToast } from "@/hooks/useOneTimeToast";
import { useToast } from "@/hooks/useToast";
import {
  loginSchema,
  LoginSchema,
} from "@/lib/zodSchema/zodAuthSchema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useActionState, useRef } from "react";
import { useForm } from "react-hook-form";

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
    label: "Email",
    name: "email",
    placeholder: "kamil@ozzip.com",
    type: "email",
    defaultValue: "user@user.com",
  },
  {
    label: "Hasło",
    name: "password",
    placeholder: "hasło",
    type: "password",
    defaultValue: "123123123",
  },
];

type State = { errors: Record<string, string[]>; inputs?: any };
const initialState: State = { errors: {}, inputs: null };

const Login = () => {
  const { toast } = useToast();
  const isAction = useRef(false);

  const loginUser = async (
    prevState: State,
    formData: FormData
  ): Promise<State> => {
    const data = Object.fromEntries(formData.entries()) as any;

    const validationResult = loginSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        errors: validationResult.error.formErrors.fieldErrors,
        inputs: data,
      };
    }

    isAction.current = true;
    const resp = await loginAction(data);

    // if (resp?.errors) {
    //   return { errors: resp.errors, inputs: data };
    // }
    isAction.current = false;

    return { errors: {}, inputs: data };
  };

  const [state, formAction, isPending] = useActionState(
    loginUser,
    initialState
  );

  // const {
  //   register,
  //   handleSubmit,
  //   setError,
  //   formState: { errors, isSubmitting },
  // } = useForm<LoginSchema>({
  //   resolver: zodResolver(loginSchema),
  // });

  // useOneTimeToast(ToastsData);

  // const onSubmit = async (data: LoginSchema) => {
  //   const trimmedData = {
  //     email: data.email.trim(),
  //     password: data.password.trim(),
  //   };

  //   try {
  //     const resp = await loginAction(trimmedData);

  //     if (resp?.error) {
  //       handleClientErrors<LoginSchema>(resp.error, setError);
  //       return;
  //     }

  //     if (resp?.error?.email?.type === "auth") {
  //       toast({
  //         title: "Błąd logowania",
  //         description: resp.error.email.message || "Coś poszło nie tak",
  //         variant: "error",
  //       });

  //       return;
  //     }
  //   } catch (err: any) {
  //     handleNextRedirectError(err);

  //     toast({
  //       title: "Błąd logowania",
  //       description: err.message || "Coś poszło nie tak",
  //       variant: "error",
  //     });
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Zaloguj się</h1>

        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <form action={formAction}>
          <InputFields
            inputsData={dataInputsLogin}
            // register={register}
            errorMsg={state.errors}
          />
          <div className="flex items-center justify-end">
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline hover:decoration-blue-600"
            >
              Nie pamiętasz hasła?
            </Link>
          </div>
          <Button
            isLoading={isAction.current && isPending}
            message="Zaloguj"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
