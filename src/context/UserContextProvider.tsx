"use client";

import React, { createContext, useContext } from "react";

type User = {
  name: string;
  role: string;
};

type UserContextType = {
  userPromise: Promise<User>;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider({
  userPromise,
  children,
}: {
  userPromise: Promise<User>;
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
