"use client";
import { FullscreenLoader } from "@/components/shared";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type LoaderContextType = {
  setLoading: (loading: boolean) => void;
};

export const LoaderContext = createContext<LoaderContextType | undefined>(
  undefined
);

type Props = {
  children: ReactNode;
};

export const LoaderContextProvider = (props: Props) => {
  const loadingCountRef = useRef(0);
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = useCallback((loading: boolean) => {
    if (loading) {
      loadingCountRef.current += 1;
      if (loadingCountRef.current === 1) {
        setIsLoading(true);
      }
    } else {
      loadingCountRef.current = Math.max(0, loadingCountRef.current - 1);
      if (loadingCountRef.current === 0) {
        setIsLoading(false);
      }
    }
  }, []);

  return (
    <LoaderContext.Provider value={{ setLoading }}>
      {isLoading && <FullscreenLoader />}
      {props.children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const ctx = useContext(LoaderContext);
  if (!ctx) {
    throw new Error("useLoader must be used inside <LoaderContextProvider>");
  }
  return ctx;
};

export const useAutoLoader = (isPending: boolean) => {
  const { setLoading } = useLoader();

  useEffect(() => {
    setLoading(isPending);
    return () => {
      if (isPending) {
        setLoading(false);
      }
    };
  }, [isPending, setLoading]);
};
