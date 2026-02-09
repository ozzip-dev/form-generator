"use client";

import { FormInput } from "@/types/input";
import React, { createContext, useContext } from "react";

type InputDataContext = Readonly<{
  input: FormInput;
  inputIdx: number;
  isLastInput: boolean;
  formId: string;
  inputNumber: number | null;
}>;
const InputDataContext = createContext<InputDataContext | null>(null);

type Props = {
  input: FormInput;
  inputIdx: number;
  isLastInput: boolean;
  formId: string;
  inputNumber: number | null;
  children: React.ReactNode;
};

export const InputDataContextProvider = (props: Props) => {
  return (
    <InputDataContext.Provider
      value={{
        input: props.input,
        inputIdx: props.inputIdx,
        isLastInput: props.isLastInput,
        formId: props.formId,
        inputNumber: props?.inputNumber,
      }}
    >
      {props.children}
    </InputDataContext.Provider>
  );
};

export const useInputData = () => {
  const context = useContext(InputDataContext);
  if (!context) {
    throw new Error(
      "useInputData must be used within a InputDataContextProvider",
    );
  }
  return context;
};
