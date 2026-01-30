import { ButtonLink } from "@/components/shared";
import Card from "@/components/shared/Card";

const EmailVerified = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="min-w-[29rem] max-w-[52rem] w-full">

        <h1 className="text-lg text-center mb-4">
          Email zweryfikowany!
        </h1>

        <p className="text-center mb-4">
          Twój email został zweryfikowany. Uzyskałeś dostęp do funkcji
          moderatora.
        </p>

        <ButtonLink message="Przejdź do panelu moderatora" link="/dashboard"
          className="w-fit h-fit m-auto bg-accent rounded-full 
          text-white text-sm py-2 px-6 hover:bg-accent_light"/>
      </Card>



    </div>
  );
};

export default EmailVerified;
