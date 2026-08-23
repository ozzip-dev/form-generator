"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import ResetPasswordForm from "./ResetPasswordForm";
import { ButtonLink, Card } from "@/components/shared";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  return token ? (
    <ResetPasswordForm token={token} />
  ) : (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full min-w-[29rem] max-w-[52rem]">
        <h1 className="mb-4 text-center text-lg">
          Link do zmiany hasła jest błędny lub nieważny
        </h1>

        <ButtonLink
          message="Przejdź do logowania"
          link="/login"
          className="m-auto h-fit w-fit rounded-full bg-accent px-6 py-2 text-sm text-white hover:bg-accent_light"
        />
      </Card>
    </div>
  );
};

export default ResetPassword;
