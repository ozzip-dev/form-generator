"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

type ErrorSlice = {
  error: any | null;
  setError: (error: string | null) => void;
};

type SettersSlice = {
  setHeaderPublishError: (error: any | null) => void;
  setAddFieldPublishError: (error: string | null) => void;
  clearHeaderFieldError: (error: any) => void;
};

const HeaderPublishErrorContext = createContext<ErrorSlice | null>(null);
const AddFieldPublishErrorContext = createContext<ErrorSlice | null>(null);
const PublishFormErrorSettersContext = createContext<SettersSlice | null>(null);

type Props = {
  children: ReactNode;
};

export function PublishFormErrorContextProvider(props: Props) {
  const [headerError, setHeaderErrorState] = useState<any>(null);
  const [addFieldError, setAddFieldErrorState] = useState<string | null>(null);

  console.log('context', headerError)

  const setHeaderPublishError = useCallback((error: any | null) => {
    setHeaderErrorState(error);
  }, []);

  const clearHeaderFieldError = useCallback((errorName: string) => {

    setHeaderErrorState((prev: any) => {
      if (!prev?.headerError) return prev;

      return {
        ...prev,
        headerError: {
          ...prev.headerError,
          [errorName]: "",
        },
      };
    });
  }, []);


  const setAddFieldPublishError = useCallback((error: string | null) => {
    setAddFieldErrorState(error);

  }, []);

  const headerValue = useMemo<ErrorSlice>(
    () => ({ error: headerError, setError: setHeaderPublishError }),
    [headerError, setHeaderPublishError]
  );
  const addFieldValue = useMemo<ErrorSlice>(
    () => ({ error: addFieldError, setError: setAddFieldPublishError }),
    [addFieldError, setAddFieldPublishError]
  );
  const settersValue = useMemo<SettersSlice>(
    () => ({
      setHeaderPublishError,
      setAddFieldPublishError,
      clearHeaderFieldError
    }),
    [setHeaderPublishError, setAddFieldPublishError, clearHeaderFieldError]
  );

  return (
    <PublishFormErrorSettersContext.Provider value={settersValue}>
      <HeaderPublishErrorContext.Provider value={headerValue}>
        <AddFieldPublishErrorContext.Provider value={addFieldValue}>
          {props.children}
        </AddFieldPublishErrorContext.Provider>
      </HeaderPublishErrorContext.Provider>
    </PublishFormErrorSettersContext.Provider>
  );
}

/** nie powoduje re-renderu przy zmianie errorów. */
export function usePublishFormErrorSetters() {
  const context = useContext(PublishFormErrorSettersContext);
  if (!context) {
    throw new Error(
      "usePublishFormErrorSetters must be used within PublishFormErrorContextProvider"
    );
  }
  return context;
}

/** re-render gdy zmieni headerError. */
export function useHeaderPublishError() {
  const context = useContext(HeaderPublishErrorContext);
  if (!context) {
    throw new Error(
      "useHeaderPublishError must be used within PublishFormErrorContextProvider"
    );
  }
  return context;
}

/**  re-render gdy zmieni addFieldError. */
export function useAddFieldPublishError() {
  const context = useContext(AddFieldPublishErrorContext);
  if (!context) {
    throw new Error(
      "useAddFieldPublishError must be used within PublishFormErrorContextProvider"
    );
  }
  return context;
}
