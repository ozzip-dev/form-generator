"use client";

import { ReactNode, useEffect, useRef } from "react";
import Card from "./cards/Card";

type ModalWrapperProps = {
  isOpen?: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function ModalWrapper({
  isOpen = true,
  onClose,
  children,
}: ModalWrapperProps) {
  const inputRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white/50 backdrop-blur-sm"
    >
      <Card className="relative mx-4">
        <button
          onClick={onClose}
          className="absolute right-8 top-4 text-lg"
          ref={inputRef}
        >
          ✕
        </button>

        {children}
      </Card>
    </div>
  );
}
