import { createRoot } from "react-dom/client";
import ConfirmModal from "@/components/shared/ConfirmModal";

export function confirmAction(
  action: () => void | Promise<void>,
  confirmText: string,
  yesText?: string,
  noText?: string
): Promise<boolean> {
  if (!document) return Promise.resolve(false);
  return new Promise((resolve) => {
    const container = document.createElement("div");
    // TODO: spr czy ma dostep do contextów, moze nizej zagniezdzic
    document.body.appendChild(container);
    const root = createRoot(container);

    const onClose = (result: boolean) => {
      resolve(result);
      root.unmount();
      container.remove();
    };

    root.render(
      <ConfirmModal {...{ action, onClose, confirmText, yesText, noText }} />
    );
  });
}
