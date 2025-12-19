"use client";

import { FileSerialized } from "@/types/file";
import { ProtocolSerialized } from "@/types/protocol";
import React, { createContext, useContext } from "react";

type ProtocolContextValue = {
  protocolPromise: Promise<ProtocolSerialized | null>;
  filesPromise: Promise<Partial<FileSerialized>[]>;
};

export const ProtocolContext = createContext<ProtocolContextValue | null>(null);

type Props = {
  protocolPromise: Promise<ProtocolSerialized | null>;
  filesPromise: Promise<Partial<FileSerialized>[]>;
  children: React.ReactNode;
};

export function ProtocolContextProvider(props: Props) {
  return (
    <ProtocolContext.Provider
      value={{
        protocolPromise: props.protocolPromise,
        filesPromise: props.filesPromise,
      }}
    >
      {props.children}
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
