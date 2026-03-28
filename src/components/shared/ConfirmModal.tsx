import { Button, FullscreenLoader } from "@/components/shared";
import { useState } from "react";
import ModalWrapper from "./ModalWrapper";

type Props = {
  onClose: (result: boolean) => void;
  action: (args?: unknown) => void /* czy tylko async fn? */ | Promise<void>;
  confirmText: string;
  args?: unknown;
  yesText?: string;
  noText?: string;
};

const ConfirmModal = (props: Props) => {
  const [isLoading, setLoading] = useState(false);
  const { yesText = "Wykonaj", noText = "Anuluj" } = props;

  const onCancel = async () => {
    props.onClose(false);
  };

  const onConfirm = async () => {
    setLoading(true);
    try {
      await props.action(props.args);
      props.onClose(true);
    } catch (e) {
      console.error(e);
      props.onClose(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper onClose={onCancel}>
      {isLoading && <FullscreenLoader />}
      <div className="p-8">
        <div className="text-center text-lg mb-10">{props.confirmText}</div>
        <div className="flex justify-center gap-8">
          <Button
            message={noText}
            onClickAction={onCancel}
            disabled={isLoading}
            className="!bg-white !text-accent hover:!bg-accent hover:!text-white"
          />
          <Button
            message={yesText}
            onClickAction={onConfirm}
            isLoading={isLoading}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmModal;
