"use client";

import { ModelToast, useOneTimeToast } from "@/hooks/useOneTimeToast";
import { useToast } from "@/hooks/useToast";
import { LogOut } from "lucide-react";
import React, { startTransition, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOutAction } from "@/actions/auth/signOutAction";

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

  const [state, signOut, pending] = useActionState(signOutAction, {
    error: null,
    success: false,
  });

  useEffect(() => {
    if (state?.error) {
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
    startTransition(() => {
      signOut();
    });
  };

  return (
    <button onClick={handleSignOut} disabled={pending}>
      {pending ? (
        <div className="flex items-center">
          <LogOut className="mr-2 h-4 w-4 animate-spin" />
          Signing out...
        </div>
      ) : (
        <div className="flex items-center">
          <LogOut className="mr-2 h-4 w-4" />
          Wyloguj
        </div>
      )}
    </button>
  );
};

export default LogoutButton;
