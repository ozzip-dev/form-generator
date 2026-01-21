"use client";
import { createContext, useState, ReactNode, useContext } from "react";

type Toast = {
  id: number;
  title: string;
  description?: string;
  variant?: "success" | "error" | "info";
};

type ToastContextType = {
  toast: (t: Omit<Toast, "id">) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

type Props = {
  children: ReactNode;
};

export const ToastProvider = (props: Props) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (toast: Omit<Toast, "id">) => {
    const id = Date.now();
    setToasts((prev) => {
      if (
        prev.some(
          (p) =>
            p.title === toast.title &&
            p.description === toast.description &&
            p.variant === toast.variant
        )
      ) {
        return prev;
      }
      return [...prev, { ...toast, id }];
    });
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {props.children}

      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 z-[101]">
        {toasts.map((toast) => {
          let bgColor = "bg-zinc-400";
          if (toast.variant === "success") bgColor = "bg-sky-400";
          if (toast.variant === "error") bgColor = "bg-rose-400";

          return (
            <div
              key={toast.id}
              className={`transform transition-all duration-300 px-4 py-3 rounded-sm shadow-lg text-white min-w-[250px] max-w-sm opacity-0 translate-y-4 animate-toast-in ${bgColor}`}
            >
              <h4 className="font-bold">{toast.title}</h4>
              {toast.description && (
                <p className="text-sm opacity-90">{toast.description}</p>
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
