"use client";

import { useUser } from "@/context/UserContextProvider";
import LogoutButton from "./LogoutButton";
import { use } from "react";
import DashboardMenu from "../DashboardMenu";

const DashboardTopBar = () => {
  const { userPromise } = useUser();
  const user = use(userPromise);

  return (
    <div className="flex justify-between items-center container">
      <DashboardMenu />
      <div className="w-1/3 flex justify-between">
        <div>
          <span>{user?.role}: </span>
          <span className="font-bold">{user?.name}</span>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
};

export default DashboardTopBar;
