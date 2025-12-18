"use client";

import { ProtocolSerialized } from "@/types/protocol";
import React, { createContext, useContext } from "react";

type ProtocolContextType = {
  protocolPromise: Promise<ProtocolSerialized | null>;
};

type ProtocolClient = ProtocolSerialized;

export const ProtocolContext = createContext<ProtocolContextType | null>(null);

export function ProtocolContextProvider({
  protocolPromise,
  children,
}: {
  protocolPromise: Promise<ProtocolClient | null>;
  children: React.ReactNode;
}) {
  return (
    <ProtocolContext.Provider value={{ protocolPromise }}>
      {children}
    </ProtocolContext.Provider>
  );
}

export function useProtocol() {
  const context = useContext(ProtocolContext);
  if (!context) {
    throw new Error(
      "useProtocol must be used within a ProtocolContextProvider"
    );
  }
  return context;
}
