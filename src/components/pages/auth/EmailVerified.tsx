import { ButtonLink, Card } from "@/components/shared";

const EmailVerified = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full min-w-[29rem] max-w-[52rem]">
        <h1 className="mb-4 text-center text-lg">Email zweryfikowany!</h1>

        <p className="mb-4 text-center">
          Twój email został zweryfikowany. Uzyskałeś dostęp do funkcji
          moderatora.
        </p>

        <ButtonLink
          message="Przejdź do panelu moderatora"
          link="/dashboard"
          className="hover:bg-accent-light m-auto h-fit w-fit rounded-full bg-accent px-6 py-2 text-sm text-white"
        />
      </Card>
    </div>
  );
};

export default EmailVerified;
