"use client";

import { useUser } from "@/context/UserContextProvider";
import LogoutButton from "./LogoutButton";
import { use } from "react";

const DashboardTopBar = () => {
  const { userPromise } = useUser();
  const user = use(userPromise);

  return (
    <div className="p-4 bg-accent_opacity">
      <div className="flex justify-between items-center">
        <p className="mb-4">
          <span>{user?.role}: </span>
          <span className="font-bold">{user?.name}</span>
        </p>
        <LogoutButton />
      </div>
    </div>
  );
};

export default DashboardTopBar;
