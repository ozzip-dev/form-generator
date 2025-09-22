"use client";
import { ActionSignUp } from "@/actions/actionsAuth/ActionSignUp";
import { GoogleAuthButton } from "@/components/Auth/GoogleAuthButton";
import InputsText from "@/components/inputs/inputsText";
import { handleFormErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { useToast } from "@/context/ContextProvider";
import {
  TSignUpShema,
  signUpSchema,
} from "@/lib/zodShema/zodAuthShema/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormAuthFooter from "../Auth/FormAuthFooter";
import { handleNextRedirectError } from "@/helpers/helpersAuth/handleNextRedirectError";
import ButtonSubmit from "../ui/buttons/ButtonSubmit";

const dataInputsSignUp = [
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

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<TSignUpShema>({
    resolver: zodResolver(signUpSchema),
  });

  const { toast } = useToast();

  const onSubmit = async (data: TSignUpShema) => {
    try {
      const resp = await ActionSignUp(data);
      if (resp?.error) {
        handleFormErrors<TSignUpShema>(resp.error, setError);
        return;
      }

      toast({
        title: "Sukces",
        description:
          "Jeżeli konto istnieje, dostałeś link do weryfikacji emaila",
        variant: "success",
      });
      reset();
    } catch (err: any) {
      handleNextRedirectError(err);

      toast({
        title: "Błąd rejestracji",
        description: err.message || "Coś poszło nie tak",
        variant: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Załóż konto</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 flex justify-center flex-col"
        >
          <InputsText
            inputsData={dataInputsSignUp}
            register={register}
            errorMsg={errors}
          />

          <ButtonSubmit isSubmitting={isSubmitting} text="Załóż konto" />
        </form>

        <div className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>

          <div className="flex gap-4 ">
            <GoogleAuthButton
              action="signup"
              buttonText="Zaloguj się z Google"
              redirectTo="/dashboard"
            />
          </div>

          <FormAuthFooter
            text="Masz konto?"
            textLink="Zaloguj się"
            link="/login"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
