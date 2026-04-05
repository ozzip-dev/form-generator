import Login from "@/components/pages/auth/Login";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Formy pracy - Formularz logowania",
};

const LoginPage = () => {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};
export default LoginPage;
