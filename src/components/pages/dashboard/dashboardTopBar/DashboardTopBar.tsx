"use client";

import { useUser } from "@/context/UserContextProvider";
import LogoutButton from "./LogoutButton";
import { use } from "react";

const DashboardTopBar = () => {
  const { userPromise } = useUser();
  const { name, role } = use(userPromise);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <p className="mb-4">
          <span>{role}: </span>
          <span className="font-bold">{name}</span>
        </p>
        <LogoutButton />
      </div>
    </div>
  );
};

export default DashboardTopBar;
