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
    variant: "info",
  },
];

type Props = {
  isUser?: boolean;
};

const LogoutButton = ({ isUser }: Props) => {
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
      router.push("/?logout=success");
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
          className={"!w-full"}
        />
      ) : (
        <>
          <ButtonLink
            message="Zarejestruj organizację"
            link={"/admin-contact"}
            variant="primary-rounded"
            className="mb-6"
          />
          <ButtonLink
            message="Zaloguj"
            link={"/login"}
            variant="primary-rounded"
          />
        </>
      )}
    </>
  );
};

export default LogoutButton;
