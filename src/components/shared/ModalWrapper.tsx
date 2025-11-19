"use client";

import { ReactNode } from "react";

type ModalWrapperProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function ModalWrapper({
  isOpen,
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
      className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
