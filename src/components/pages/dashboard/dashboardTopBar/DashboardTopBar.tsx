"use client";

import { useUser } from "@/context/UserContextProvider";
import LogoutButton from "./LogoutButton";
import { use } from "react";
import { useErrorBoundary } from "react-error-boundary";

type Props = {
  user?: { name: string; role: string };
};

const DashboardTopBar = ({ user: userFromProps }: Props) => {
  let userFromContext = null;
  const { userPromise } = useUser();
  userFromContext = use(userPromise);

  const { showBoundary } = useErrorBoundary();

  try {
    const { userPromise } = useUser();
    userFromContext = use(userPromise);
  } catch (err) {
    showBoundary(err);
  }

  const loggedUser = userFromProps ?? userFromContext;

  if (!loggedUser) return;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <p className="mb-4">
          <span>{loggedUser.role}: </span>
          <span className="font-bold">{loggedUser.name}</span>
        </p>
        <LogoutButton />
      </div>
    </div>
  );
};

export default DashboardTopBar;
