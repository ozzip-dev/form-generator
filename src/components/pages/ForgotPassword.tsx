"use client";

import { ActionForgotPassword } from "@/actions/actionsAuth/ActionForgotPassword";
import { handleFormErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { useToast } from "@/hooks/use-toast";
import {
  TForgotPasswordShema,
  forgotPasswordSchema,
} from "@/lib/zodShema/zodAuthShema/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormAuthFooter from "../Auth/FormAuthFooter";
import InputsText from "../inputs/inputsText";
import ButtonSubmit from "../ui/ButtonSubmit";

const dataInputsForgotPassword = [
  {
    label: "Podaj swój email",
    name: "email",
    placeholder: "kamil@ozzip.com",
    type: "email",
  },
];

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TForgotPasswordShema>({
    resolver: zodResolver(forgotPasswordSchema),
    // defaultValues: {
    //   name: "",
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    // },
  });

  const { toast } = useToast();

  const onSubmit = async (data: TForgotPasswordShema) => {
    try {
      const resp = await ActionForgotPassword(data);

      // if (resp?.error?.email?.type === "auth") {
      //   toast({
      //     title: "Błąd logowania",
      //     description: resp.error.email.message,
      //     variant: "destructive",
      //   });
      //   return;
      // }

      if (resp?.error) {
        handleFormErrors<TForgotPasswordShema>(resp.error, setError);
        return;
      }

      toast({
        title: "Sukces",
        description: "Jeżeli konto istnieje, wysłaliśmy link do resetu hasła",
        variant: "default",
      });
    } catch (err: any) {
      toast({
        title: "Błąd. Spróbuj ponownie",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Nie pamiętasz hasła?</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputsText
            inputsData={dataInputsForgotPassword}
            register={register}
            errorMsg={errors}
          />

          <ButtonSubmit isSubmitting={isSubmitting} text="Wyślij link" />
        </form>

        <FormAuthFooter
          text="Masz konto?"
          textLink="Zaloguj się"
          link="/login"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
