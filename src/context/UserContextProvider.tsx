"use client";

import { UserSerialized } from "@/types/user";
import React, { createContext, useContext } from "react";

type UserContextType = {
  userPromise: Promise<UserSerialized | null>;
};

type UserClient = UserSerialized;

export const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider({
  userPromise,
  children,
}: {
  userPromise: Promise<UserClient | null>;
  children: React.ReactNode;
}) {
  return (
    <UserContext.Provider value={{ userPromise }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
