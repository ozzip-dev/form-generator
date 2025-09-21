"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Toast = {
  id: number;
  title: string;
  description?: string;
  variant?: "success" | "error" | "info";
};

type ToastContextType = {
  toast: (t: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (t: Omit<Toast, "id">) => {
    const id = Date.now();
    setToasts((prev) => {
      if (
        prev.some(
          (p) =>
            p.title === t.title &&
            p.description === t.description &&
            p.variant === t.variant
        )
      ) {
        return prev;
      }
      return [...prev, { ...t, id }];
    });
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => {
          let bgColor = "bg-zinc-400";
          if (t.variant === "success") bgColor = "bg-sky-400";
          if (t.variant === "error") bgColor = "bg-rose-400";

          return (
            <div
              key={t.id}
              className={`transform transition-all duration-300 px-4 py-3 rounded-lg shadow-lg text-white min-w-[250px] max-w-sm opacity-0 translate-y-4 animate-toast-in ${bgColor}`}
            >
              <h4 className="font-bold">{t.title}</h4>
              {t.description && (
                <p className="text-sm opacity-90">{t.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return ctx;
};
