"use client";
import { ActionSignOut } from "@/actions/actionsAuth/ActionSignOut";
import { useToast } from "@/context/ContextProvider";
import { IUser } from "@/types/user";
import { LogOut } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  user: IUser;
};

const Dashboard = (props: Props) => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("login") === "success") {
      toast({
        title: "Witaj!",
        description: "Zostałeś pomyślnie zalogowany",
        variant: "success",
      });
    }
  }, [searchParams]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await ActionSignOut();
    } catch (err: any) {
      const digest = err?.digest;
      const message = err?.message;
      if (
        digest === "NEXT_REDIRECT" ||
        (typeof digest === "string" && digest.includes("NEXT_REDIRECT")) ||
        message === "NEXT_REDIRECT"
      ) {
        throw err;
      }

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin panel</h1>
        <div>
          {props.user.role}: {props.user.name}
        </div>
        <button onClick={handleSignOut} disabled={isSigningOut}>
          {isSigningOut ? (
            <>
              <LogOut className="mr-2 h-4 w-4 animate-spin" />
              Signing out...
            </>
          ) : (
            <>
              <LogOut className="mr-2 h-4 w-4" />
              Wyloguj
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
