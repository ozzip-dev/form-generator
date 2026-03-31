"use client";

import { removeProtocolAction } from "@/actions/protocol";
import { Button, IconTrash } from "@/components/shared";
import { useModal } from "@/context/ModalContextProvider";

type Props = {
  ProtocolId: string;
};

function RemoveProtocolBtn(props: Props) {
  const { openModal } = useModal();

  return (
    <Button
      type="button"
      icon={<IconTrash />}
      variant="ghost"
      ariaLabel="Usuń protokół"
      onClickAction={() =>
        openModal({
          action: () => removeProtocolAction(props.ProtocolId),
          header: "Usunąć protokół?",
        })
      }
      className=""
    />
  );
}

export default RemoveProtocolBtn;
