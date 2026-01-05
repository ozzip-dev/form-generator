"use client";

import { useUser } from "@/context/UserContextProvider";
import { use } from "react";
import DashboardMenu from "../DashboardMenu";
import LogoutButton from "./LogoutButton";

const DashboardTopBar = () => {
  const { userPromise } = useUser();
  const user = use(userPromise);

  return (
    <div className="relative container py-6 flex justify-between items-center">
      <DashboardMenu />

      <div className="flex items-center gap-6">
        <div className="hidden sm:block">
          <span>{user?.role}: </span>
          <span className="font-bold">{user?.name}</span>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
};

export default DashboardTopBar;
