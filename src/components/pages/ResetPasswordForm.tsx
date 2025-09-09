"use client";
import { InputField } from "@/components/Auth/FormFields";
import { useToast } from "@/hooks/use-toast";
import { TResetPasswordShema } from "@/lib/schema/resetPasswordSchema";
import { Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import InputsText from "../inputs/inputsText";
import { handleFormErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { ActionResetPassword } from "@/actions/actionsAuth/ActionResetPassword";

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
    // resolver: zodResolver(resetPasswordSchema),
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

          <button
            type="submit"
            className="w-full bg-red-100 flex"
            disabled={isSubmitting}
          >
            {isSubmitting ? <>Zapis</> : <>Zmień hasło</>}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Pamiętasz hasło?{" "}
          <Link
            href="/login"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Zaloguj
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
