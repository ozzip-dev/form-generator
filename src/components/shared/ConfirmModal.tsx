import { Button, FullscreenLoader } from "@/components/shared";
import { useState } from "react";
import ModalWrapper from "./ModalWrapper";

type Props = {
  onClose: (result: boolean) => void;
  action: () => void /* czy tylko async fn? */ | Promise<void>;
  confirmText: string;
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
      await props.action();
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
      <div>{props.confirmText}</div>
      <div className="flex gap-3">
        <Button message={noText} onClickAction={onCancel} />
        <Button message={yesText} onClickAction={onConfirm} />
      </div>
    </ModalWrapper>
  );
};

export default ConfirmModal;
