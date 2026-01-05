"use client";

import { ModelToast, useOneTimeToast } from "@/hooks/useOneTimeToast";
import React, { startTransition, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOutAction } from "@/actions/auth/signOutAction";
import { useToast } from "@/context/ToastProvider";
import { Button } from "@/components/shared";

const ToastsData: ModelToast[] = [
  {
    param: "login",
    expectedValue: "success",
    title: "Witaj!",
    description: "Zostałeś zalogowany",
    variant: "success",
  },
];

const LogoutButton = () => {
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
    <Button
      onClickAction={handleSignOut}
      isLoading={pending}
      message="Wyloguj"
      variant="ghost"
      className="bg-white rounded-full text-accent py-1 px-4  w-fit"
    />
  );
};

export default LogoutButton;
