"use client";

import { ReactNode } from "react";
import Card from "./Card";

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
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-[100]"
    >
      <Card className="relative mx-4">
        <button onClick={onClose} className="absolute top-4 right-8  text-lg">
          ✕
        </button>

        {children}
      </Card>
    </div>
  );
}
