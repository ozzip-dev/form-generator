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

const HeaderPublishErrorContext = createContext<ErrorSlice | null>(null);
const AddFieldPublishErrorContext = createContext<ErrorSlice | null>(null);

type SettersSlice = {
  setHeaderPublishError: (error: any | null) => void;
  setAddFieldPublishError: (error: string | null) => void;
};

const PublishFormErrorSettersContext = createContext<SettersSlice | null>(null);

type Props = {
  children: ReactNode;
};

export function PublishFormErrorContextProvider(props: Props) {
  const [headerError, setHeaderErrorState] = useState<any>(null);
  const [addFieldError, setAddFieldErrorState] = useState<string | null>(null);

  const setHeaderPublishError = useCallback((error: any | null) => {
    setHeaderErrorState(error);
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
    }),
    [setHeaderPublishError, setAddFieldPublishError]
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

/** Tylko do ustawiania błędów (np. w PublishFormButton). Nie powoduje re-renderu przy zmianie errorów. */
export function usePublishFormErrorSetters() {
  const context = useContext(PublishFormErrorSettersContext);
  if (!context) {
    throw new Error(
      "usePublishFormErrorSetters must be used within PublishFormErrorContextProvider"
    );
  }
  return context;
}

/** Subskrybuje tylko błąd nagłówka – re-render tylko gdy zmieni się headerError. */
export function useHeaderPublishError() {
  const context = useContext(HeaderPublishErrorContext);
  if (!context) {
    throw new Error(
      "useHeaderPublishError must be used within PublishFormErrorContextProvider"
    );
  }
  return context;
}

/** Subskrybuje tylko błąd pól – re-render tylko gdy zmieni się addFieldError. */
export function useAddFieldPublishError() {
  const context = useContext(AddFieldPublishErrorContext);
  if (!context) {
    throw new Error(
      "useAddFieldPublishError must be used within PublishFormErrorContextProvider"
    );
  }
  return context;
}
