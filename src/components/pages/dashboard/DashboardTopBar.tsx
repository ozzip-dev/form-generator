"use client";

import { SignOutAction } from "@/actions/auth/SignOutAction";
import { handleNextRedirectError } from "@/helpers/helpersAuth/handleNextRedirectError";
import { ModelToast, useOneTimeToast } from "@/hooks/useOneTimeToast";
import { useToast } from "@/hooks/useToast";
import { LogOut } from "lucide-react";
import React, { useState } from "react";
import DashboardMenu from "./DashboardMenu";

type Props = {
  user: { name: string; role: string };
};

const ToastsData: ModelToast[] = [
  {
    param: "login",
    expectedValue: "success",
    title: "Witaj!",
    description: "Zostałeś zalogowany",
    variant: "success",
  },
];

export default function DashboardTopBar({ user }: Props) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { toast } = useToast();
  useOneTimeToast(ToastsData);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await SignOutAction();
    } catch (err: any) {
      handleNextRedirectError(err);
      toast({
        title: "Błąd wylogowania",
        description: "Wystąpił problem podczas wylogowywania",
        variant: "error",
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <p className="mb-4">
          <span>{user.role}: </span>
          <span className="font-bold">{user.name}</span> <br />
        </p>
        <button onClick={handleSignOut} disabled={isSigningOut}>
          {isSigningOut ? (
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
      </div>
    </div>
  );
}
