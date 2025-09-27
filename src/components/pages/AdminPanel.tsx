"use client";
import { ActionSignOut } from "@/actions/actionsAuth/ActionSignOut";
import { useOneTimeToast } from "@/hooks/useOneTimeToast";
import { useToast } from "@/hooks/useToast";
import { IUser } from "@/types/user";
import { LogOut } from "lucide-react";
// import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ModelToast } from "@/hooks/useOneTimeToast";
import SignUp from "./Signup";

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
  user: IUser;
};

const AdminPanel = (props: Props) => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { toast } = useToast();
  // TODO Krzysztof: if not needed, delete
  // const searchParams = useSearchParams();

  useOneTimeToast(ToastsData);

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
    <>
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
      <SignUp />
    </>
  );
};

export default AdminPanel;
