import ButtonLink from "@/components/ui/buttons/ButtonLink";
import { CheckCircle2 } from "lucide-react";

const EmailVerified = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 text-center bg-white rounded-lg shadow-md">
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Email zweryfikowany!
        </h1>

        <p className="text-gray-600">
          Twój email został zweryfikowany. Uzyskałeś dostęp do funkcji
          moderatora.
        </p>

        <ButtonLink message="Przejdź do panelu moderatora" link="/dashboard" />
      </div>
    </div>
  );
};

export default EmailVerified;
