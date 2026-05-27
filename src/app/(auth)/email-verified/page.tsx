import EmailVerified from "@/components/pages/auth/EmailVerified";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formy pracy - Weryfikacja email",
};

const EmailVerifiedPage = () => {
  return <EmailVerified />;
};
export default EmailVerifiedPage;
