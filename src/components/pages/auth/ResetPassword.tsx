"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import ResetPasswordForm from "./ResetPasswordForm";
import ButtonLink from "../ui/buttons/ButtonLink";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  return token ? (
    <ResetPasswordForm token={token} />
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="w-full max-w-md">
        <p className="text-muted-foreground mb-4 text-center">
          Link do zmiany hasła jest błędny lub nieważny
        </p>
        <ButtonLink message="Przejdź do logowania" link="/login" />
      </div>
    </div>
  );
};

export default ResetPassword;
