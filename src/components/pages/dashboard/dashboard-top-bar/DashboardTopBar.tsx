"use client";

import { useUser } from "@/context/UserContextProvider";
import { use } from "react";
import DashboardMenu from "../DashboardMenu";
import LogoutButton from "./LogoutButton";

const DashboardTopBar = () => {
  const { userPromise } = useUser();
  const user = use(userPromise);

  return (
    <div className="relative flex items-center">
      <DashboardMenu />

      <div className="ml-16 mr-10 lg:ml-auto">
        <span>{user?.role}: </span>
        <span className="font-bold">{user?.name}</span>
      </div>

      <div className="ml-auto lg:ml-0">
        <LogoutButton />
      </div>
    </div>
  );
};

export default DashboardTopBar;
