"use client";
import { ActionResetPassword } from "@/actions/actionsAuth/ActionResetPassword";
import { handleFormErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { useToast } from "@/hooks/use-toast";
import {
  TResetPasswordShema,
  resetPasswordSchema,
} from "@/lib/zodShema/zodAuthShema/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import InputsText from "../inputs/inputsText";
import ButtonSubmit from "../ui/ButtonSubmit";
import FormAuthFooter from "../Auth/FormAuthFooter";

const dataInputsResetPassword = [
  {
    label: "Nowe hasło",
    name: "password",
    placeholder: "XXXX",
    type: "password",
  },
  {
    label: "Powtórz hasło",
    name: "confirmPassword",
    placeholder: "XXXX",
    type: "password",
  },
];

const ResetPasswordForm = ({ token }: { token: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TResetPasswordShema>({
    resolver: zodResolver(resetPasswordSchema),
    // defaultValues: {
    //   name: "",
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    // },
  });

  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data: TResetPasswordShema) => {
    try {
      const resp = await ActionResetPassword({ ...data, token });

      if (resp?.error?.password?.type === "auth") {
        toast({
          title: "Błąd resetowania hasła",
          description: resp.error.password.message,
          variant: "destructive",
        });
        return;
      }

      if (resp?.error) {
        handleFormErrors<TResetPasswordShema>(resp.error, setError);
        return;
      }

      // Success case
      if (resp?.success) {
        toast({
          title: "Hasło zostało zresetowane",
          description:
            "Twoje hasło zostało pomyślnie zmienione. Możesz się teraz zalogować.",
        });

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err: any) {
      const digest = err?.digest;
      const message = err?.message;
      if (
        digest === "NEXT_REDIRECT" ||
        (typeof digest === "string" && digest.includes("NEXT_REDIRECT")) ||
        message === "NEXT_REDIRECT"
      ) {
        throw err;
      }

      toast({
        title: "Błąd logowania",
        description: err.message || "Coś poszło nie tak",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Zmień hasło</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputsText
            inputsData={dataInputsResetPassword}
            register={register}
            errorMsg={errors}
          />
          <ButtonSubmit isSubmitting={isSubmitting} text="Zmień hasło" />
        </form>

        <FormAuthFooter
          text="Pamiętasz hasło?"
          textLink="Zaloguj się"
          link="/login"
        />
      </div>
    </div>
  );
};

export default ResetPasswordForm;
