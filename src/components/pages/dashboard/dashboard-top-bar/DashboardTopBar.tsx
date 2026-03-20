"use client";

import { useUser } from "@/context/UserContextProvider";
import { use } from "react";
import DashboardMenu from "../DashboardMenu";
import LogoutButton from "./LogoutButton";

const DashboardTopBar = () => {
  const { userPromise } = useUser();
  const user = use(userPromise);

  return (
    <div className="relative mr-7 flex items-center px-4 sm:px-8 md:px-24">
      <DashboardMenu />

      <div className="ml-16 mr-10 text-white lg:ml-auto">
        <span>{user?.role}: </span>
        <span className="font-semibold">{user?.name}</span>
      </div>

      <div className="ml-auto lg:ml-0">
        <LogoutButton />
      </div>
    </div>
  );
};

export default DashboardTopBar;
