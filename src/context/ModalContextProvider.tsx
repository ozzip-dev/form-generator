"use client";

import {
  createContext,
  ReactNode,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useActionState } from "react";
import ModalWrapper from "@/components/shared/ModalWrapper";
import { Button } from "@/components/shared";


type ModalConfig = {
  action?: (...args: any[]) => void | Promise<void>;
  header: ReactNode;
  confirmBtnMessage?: string;
  component?:
  | ((props: { close: () => void }) => React.ReactNode)
  | React.ReactNode;
};

type ModalContextType = {
  openModal: (config: ModalConfig) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<ModalConfig | null>(null);
  const justFinished = useRef(false);

  const [_, action, isPending] = useActionState(async () => {
    if (!config?.action) return;
    await config.action();
  }, undefined);

  const close = () => setConfig(null);

  useEffect(() => {
    if (isPending) {
      justFinished.current = true;
    }

    if (!isPending && justFinished.current) {
      close();
      justFinished.current = false;
    }
  }, [isPending]);

  const openModal = useCallback((config: ModalConfig) => {
    setConfig({
      confirmBtnMessage: "Potwierdź",
      ...config,
    });
  }, []);

  return (
    <ModalContext.Provider value={{ openModal }}>
      {isPending && <div className="fixed inset-0 z-[110]"></div>}
      <ModalWrapper isOpen={!!config} onClose={close}>
        {config?.component ? (
          typeof config.component === "function" ? (
            <div className="p-8">
              <div className="text-center text-lg mb-10">{config?.header}</div>
              {config.component({ close })}
            </div>
          ) : (
            <div className="p-8">
              <div className="text-center text-lg mb-10">{config?.header}</div>
              {config.component}
            </div>
          )
        ) : (
          <div className="p-8">
            <div className="text-center text-lg mb-10">{config?.header}</div>

            <div className="flex justify-center gap-8">
              <Button
                message="Anuluj"
                onClickAction={close}
                disabled={isPending}
                className="!bg-white !text-accent hover:!bg-accent hover:!text-white"
              />

              <Button
                message={config?.confirmBtnMessage}
                onClickAction={() => {
                  startTransition(() => {
                    action();
                  });
                }}
                isLoading={isPending}
              />
            </div>
          </div>
        )}
      </ModalWrapper>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx)
    throw new Error("useModal must be used inside ModalContextProvider");
  return ctx;
};
