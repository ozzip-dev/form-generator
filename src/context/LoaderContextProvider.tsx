"use client";

import { FullscreenLoader } from "@/components/shared";
import { usePathname } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type LoaderVariant = "fullscreen" | "small";

type LoaderContextType = {
  setLoading: (variant: LoaderVariant, loading: boolean) => void;
};

export const LoaderContext = createContext<LoaderContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export const LoaderContextProvider = ({ children }: Props) => {
  const pathname = usePathname();
  const showSmallLoaderInfo =
    pathname?.startsWith("/forms/") && pathname?.endsWith("/edit");

  const counters = useRef<Record<LoaderVariant, number>>({
    fullscreen: 0,
    small: 0,
  });

  const [visible, setVisible] = useState<Record<LoaderVariant, boolean>>({
    fullscreen: false,
    small: false,
  });

  const setLoading = useCallback((variant: LoaderVariant, loading: boolean) => {
    const next = counters.current;

    if (loading) {
      next[variant] += 1;
    } else {
      next[variant] = Math.max(0, next[variant] - 1);
    }

    setVisible((prev) => ({
      ...prev,
      [variant]: next[variant] > 0,
    }));
  }, []);

  return (
    <LoaderContext.Provider value={{ setLoading }}>
      {visible.fullscreen && <FullscreenLoader />}
      {showSmallLoaderInfo && (
        <div className="container relative">
          <div className="absolute left-4 top-[10.5rem] text-xs text-accent sm:top-[11.5rem]">
            {visible.small
              ? "Zapisywanie danych..."
              : "Dane formularza zapisane"}
          </div>
        </div>
      )}

      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const ctx = useContext(LoaderContext);
  if (!ctx) {
    throw new Error("useLoader must be used inside LoaderContextProvider");
  }
  return ctx;
};

export const useAutoLoader = (
  isPending: boolean,
  variant: "fullscreen" | "small" = "fullscreen",
) => {
  const { setLoading } = useLoader();

  useEffect(() => {
    setLoading(variant, isPending);

    return () => {
      if (isPending) {
        setLoading(variant, false);
      }
    };
  }, [isPending, variant, setLoading]);
};
