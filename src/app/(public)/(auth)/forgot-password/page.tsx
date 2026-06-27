import ForgotPassword from "@/components/pages/auth/ForgotPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formy pracy - Formularz zmiany hasła",
};

const ForgotPasswordPage = () => {
  return <ForgotPassword />;
};
export default ForgotPasswordPage;
