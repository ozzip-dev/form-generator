"use client";

import { removeProtocolAction } from "@/actions/protocol";
import { Button, Icon } from "@/components/shared";
import { useModal } from "@/context/ModalContextProvider";

type Props = {
  ProtocolId: string;
};

function RemoveProtocolBtn(props: Props) {
  const { openModal } = useModal();

  return (
    <Button
      type="button"
      icon={<Icon icon="trash" size={20} className="bg-font_dark" />}
      variant="ghost"
      ariaLabel="Usuń protokół"
      onClickAction={() =>
        openModal({
          action: () => removeProtocolAction(props.ProtocolId),
          header: "Usunąć protokół?",
          confirmBtnMessage: "Usuń",
        })
      }
    />
  );
}

export default RemoveProtocolBtn;
