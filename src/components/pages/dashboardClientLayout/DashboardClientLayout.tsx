"use client";

import { ActionSignOut } from "@/actions/auth/ActionSignOut";
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

export default function DashboardClientLayout({ user }: Props) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { toast } = useToast();
  useOneTimeToast(ToastsData);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await ActionSignOut();
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
    <header className="bg-gray-50">
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
        {user.role === "moderator" && <DashboardMenu />}
      </div>
    </header>
  );
}
