"use client";
import { Button } from "@/components/shared";
import ModalWrapper from "@/components/shared/ModalWrapper";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type ConfirmAction = () => void | Promise<void>;

type ConfirmModalConfig = {
  action: ConfirmAction;
  header: string;
  confirmBtnMessage?: string;
};

type ModalContextType = {
  openModal: (config: ConfirmModalConfig) => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

type Props = {
  children: ReactNode;
};

export const ModalContextProvider = (props: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    header: "",
    confirmBtnMessage: "Potwierdź",
  });
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(
    null
  );

  const close = () => setOpen(false);

  const openModal = useCallback((config: ConfirmModalConfig) => {
    setConfirmAction(() => config.action);
    setOpen(true);
    setConfig({
      ...config,
      confirmBtnMessage: config.confirmBtnMessage || "Potwierdź",
      header: config.header,
    });
  }, []);

  const handleConfirm = async () => {
    if (!confirmAction) return;
    setLoading(true);
    try {
      await confirmAction();
      setOpen(false);
      setConfirmAction(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      <div className="inset-0 z-50 bg-error"></div>
      <ModalWrapper isOpen={isOpen} onClose={close}>
        {isloading && <div className="fixed inset-0 z-50"></div>}
        <div className="p-8">
          <div className="text-center text-lg mb-10">{config.header}</div>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <Button
              message={"Anuluj"}
              onClickAction={close}
              className="!bg-white 
              !text-accent border border-accent"
            />
            <Button
              message={config.confirmBtnMessage}
              onClickAction={handleConfirm}
              isLoading={isloading}
            />
          </div>
        </div>
      </ModalWrapper>
      {props.children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used inside <ToastProvider>");
  }
  return ctx;
};
