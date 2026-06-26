"use client";

import { ModelToast, useOneTimeToast } from "@/hooks/useOneTimeToast";
import React, { startTransition, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOutAction } from "@/actions/auth/signOutAction";
import { useToast } from "@/context/ToastProvider";
import { Button, ButtonLink } from "@/components/shared";

const ToastsData: ModelToast[] = [
  {
    param: "login",
    expectedValue: "success",
    title: "Witaj!",
    description: "Zostałeś zalogowany",
    variant: "success",
  },
];

type Props = {
  className?: string;
  isUser?: boolean;
};

const LogoutButton = ({ className, isUser }: Props) => {
  const router = useRouter();
  useOneTimeToast(ToastsData);
  const { toast } = useToast();

  const [state, signOut, pending] = useActionState(signOutAction, null);

  useEffect(() => {
    if (state?.success === false) {
      toast({
        title: "Błąd wylogowania",
        description: state.error,
        variant: "error",
      });
    }

    if (state?.success) {
      router.push("/login?logout=success");
    }
  }, [state, toast, router]);

  const handleSignOut = () => {
    startTransition(signOut);
  };

  return (
    <>
      {" "}
      {isUser ? (
        <Button
          onClickAction={handleSignOut}
          isLoading={pending}
          message="Wyloguj"
          variant="primary-rounded"
          className={
            className ||
            "!bg-white !text-accent hover:!border-white hover:!bg-accent hover:!text-white"
          }
        />
      ) : (
        <>
          <ButtonLink
            message="Zarejestruj organizację"
            link={"/admin-contact"}
            variant="primary-rounded"
            className="!bg-white !text-accent hover:!border-white hover:!bg-accent hover:!text-white"
          />
          <ButtonLink
            message="Zaloguj"
            link={"/login"}
            variant="primary-rounded"
            className="!bg-white !text-accent hover:!border-white hover:!bg-accent hover:!text-white"
          />
        </>
      )}
    </>
  );
};

export default LogoutButton;
