import ResetPassword from "@/components/pages/auth/ResetPassword";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Formy pracy - Formularz zmiany hasła",
};

const ResetPasswordPage = () => {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
};
export default ResetPasswordPage;
