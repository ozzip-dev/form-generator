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
  action: (...args: any[]) => void | Promise<void>;
  header: string;
  confirmBtnMessage?: string;
};

type ModalContextType = {
  openModal: (config: ModalConfig) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<ModalConfig | null>(null);
  const justFinished = useRef(false);

  const [_, action, isPending] = useActionState(async () => {
    if (!config) return;
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
        {config && (
          <div className="p-8">
            <div className="text-center text-lg mb-10">{config.header}</div>

            <div className="flex justify-center gap-8">
              <Button
                message="Anuluj"
                onClickAction={close}
                disabled={isPending}
                className="!bg-white !text-accent border border-accent"
              />

              <Button
                message={config.confirmBtnMessage}
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

// "use client";

// import {
//   createContext,
//   ReactNode,
//   useCallback,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
//   useTransition,
// } from "react";
// import { useRouter } from "next/navigation";
// import ModalWrapper from "@/components/shared/ModalWrapper";
// import { Button } from "@/components/shared";

// type ConfirmModalConfig = {
//   action: () => Promise<void>;
//   header: string;
//   confirmBtnMessage?: string;
// };

// type ModalContextType = {
//   openModal: (config: ConfirmModalConfig) => void;
// };

// const ModalContext = createContext<ModalContextType | null>(null);

// export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
//   const [config, setConfig] = useState<ConfirmModalConfig | null>(null);
//   const [isPending, startTransition] = useTransition();
//   const justFinished = useRef(false);
//   const close = () => setConfig(null);

//   const openModal = useCallback((config: ConfirmModalConfig) => {
//     setConfig({
//       confirmBtnMessage: "Potwierdź",
//       ...config,
//     });
//   }, []);

//   const handleConfirm = () => {
//     if (!config) return;

//     startTransition(async () => {
//       await config.action();
//     });
//   };

//   useEffect(() => {
//     if (!isPending) {
//       close();
//     }

//     if (isPending) {
//       justFinished.current = true;
//     }

//     if (!isPending && justFinished.current) {
//       close();
//       justFinished.current = false;
//     }
//   }, [isPending]);

//   return (
//     <ModalContext.Provider value={{ openModal }}>
//       <ModalWrapper isOpen={!!config} onClose={close}>
//         {isPending && <div className="fixed inset-0 z-50"></div>}
//         {config && (
//           <div className="p-8">
//             <div className="text-center text-lg mb-10">{config.header}</div>

//             <div className="flex flex-col sm:flex-row justify-center gap-8">
//               <Button
//                 message="Anuluj"
//                 onClickAction={close}
//                 className="!bg-white !text-accent border border-accent"
//                 disabled={isPending}
//               />

//               <Button
//                 message={config.confirmBtnMessage}
//                 onClickAction={handleConfirm}
//                 isLoading={isPending}
//               />
//             </div>
//           </div>
//         )}
//       </ModalWrapper>
//       {children}
//     </ModalContext.Provider>
//   );
// };

// export const useModal = () => {
//   const ctx = useContext(ModalContext);
//   if (!ctx)
//     throw new Error("useModal must be used inside ModalContextProvider");
//   return ctx;
// };

// "use client";

// import {
//   createContext,
//   ReactNode,
//   useCallback,
//   useContext,
//   useState,
// } from "react";
// import { useActionState } from "react";
// import ModalWrapper from "@/components/shared/ModalWrapper";
// import { Button } from "@/components/shared";

// type ConfirmModalConfig = {
//   action: () => Promise<void>;
//   header: string;
//   confirmBtnMessage?: string;
// };

// type ModalContextType = {
//   openModal: (config: ConfirmModalConfig) => void;
// };

// const ModalContext = createContext<ModalContextType | null>(null);

// export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
//   const [config, setConfig] = useState<ConfirmModalConfig | null>(null);

//   const close = () => setConfig(null);

//   const openModal = useCallback((config: ConfirmModalConfig) => {
//     setConfig({
//       confirmBtnMessage: "Potwierdź",
//       ...config,
//     });
//   }, []);

//   const [, confirmAction, isPending] = useActionState(async () => {
//     if (!config) return;
//     await config.action();
//     close();
//   }, null);

//   return (
//     <ModalContext.Provider value={{ openModal }}>
//       <ModalWrapper isOpen={!!config} onClose={close}>
//         {config && (
//           <div className="p-8">
//             <div className="text-center text-lg mb-10">{config.header}</div>

//             <div className="flex flex-col sm:flex-row justify-center gap-8">
//               <Button
//                 message="Anuluj"
//                 onClickAction={close}
//                 disabled={isPending}
//                 className="!bg-white !text-accent border border-accent"
//               />

//               <Button
//                 message={config.confirmBtnMessage}
//                 onClickAction={confirmAction}
//                 isLoading={isPending}
//               />
//             </div>
//           </div>
//         )}
//       </ModalWrapper>

//       {children}
//     </ModalContext.Provider>
//   );
// };

// export const useModal = () => {
//   const ctx = useContext(ModalContext);
//   if (!ctx)
//     throw new Error("useModal must be used inside ModalContextProvider");
//   return ctx;
// };
