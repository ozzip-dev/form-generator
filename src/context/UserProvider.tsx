"use client";

import React, { createContext, useContext } from "react";

type User = {
  name: string;
  role: string;
};

type UserContextType = {
  user: User;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserProvider({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
