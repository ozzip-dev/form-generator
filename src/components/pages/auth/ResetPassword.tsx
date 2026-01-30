"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import ResetPasswordForm from "./ResetPasswordForm";
import { ButtonLink } from "@/components/shared";
import Card from "@/components/shared/Card";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  return token ? (
    <ResetPasswordForm token={token} />
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="min-w-[29rem] max-w-[52rem] w-full">
        <h1 className="text-lg text-center mb-4">
          Link do zmiany hasła jest błędny lub nieważny</h1>

        <ButtonLink message="Przejdź do logowania" link="/login"
          className="w-fit h-fit m-auto bg-accent rounded-full 
                text-white text-sm py-2 px-6 hover:bg-accent_light"/>
      </Card>
    </div>
  );
};

export default ResetPassword;
