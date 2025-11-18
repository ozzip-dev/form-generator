"use client";

import { SignOutAction } from "@/actions/auth/SignOutAction";
import { handleNextRedirectError } from "@/helpers/helpersAuth/handleNextRedirectError";
import { ModelToast, useOneTimeToast } from "@/hooks/useOneTimeToast";
import { useToast } from "@/hooks/useToast";
import { LogOut } from "lucide-react";
import React, { useActionState, useEffect } from "react";
import DashboardMenu from "../DashboardMenu";
import { useRouter } from "next/navigation";

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

  const [state, signOut, pending] = useActionState(SignOutAction, {
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
  }, [state.error, state.success]);

  return (
    <form action={signOut}>
      <button disabled={pending}>
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
    </form>
  );
};

export default LogoutButton;
