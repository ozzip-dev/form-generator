"use client";
import { Button } from "@/components/shared";
import ModalWrapper from "@/components/shared/ModalWrapper";
import { createContext, useState, ReactNode, useContext } from "react";

type ConfirmAction = () => void | Promise<void>;

type ConfirmModalConfig = {
  action: ConfirmAction;
  header: string;
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
  const [header, setHeader] = useState("");
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(
    null
  );

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  const openModal = (config: ConfirmModalConfig) => {
    setConfirmAction(() => config.action);
    setOpen(true);
    setHeader(config.header);
  };

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
      <ModalWrapper isOpen={isOpen} onClose={open}>
        <div>{header}</div>
        <div className="flex gap-3">
          <Button message={"Anuluj"} onClickAction={close} />
          <Button
            message={"Potwierdź"}
            onClickAction={handleConfirm}
            isLoading={isloading}
          />
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
