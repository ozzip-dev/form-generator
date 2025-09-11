"use client";
import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ActionSignOut } from "@/actions/actionsAuth/ActionSignOut";
import { IUser } from "@/types/user";

// TODO: added for role validation only, edit later
type Props = {
  user: IUser;
};

const Dashboard = (props: Props) => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const resp = await ActionSignOut();

      if (resp?.error) {
        toast({
          variant: "destructive",
          title: "Błąd wylogowania",
          description: resp.error.message,
        });
        return;
      }

      if (resp?.success) {
        toast({
          title: "Wylogowano pomyślnie",
          description: "Zostałeś pomyślnie wylogowany",
        });

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Błąd wylogowania",
        description: "Wystąpił problem podczas wylogowywania",
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
