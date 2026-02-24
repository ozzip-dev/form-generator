"use client";

import { removeProtocolAction } from "@/actions/protocol";
import { Button, IconTrash } from "@/components/shared";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useModal } from "@/context/ModalContextProvider";
import { startTransition, useActionState } from "react";

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
      ariaLabel="Usuń protokuł"
      onClickAction={() =>
        openModal({
          action: () => removeProtocolAction(props.ProtocolId),
          header: "Usunąć protokuł?",
        })
      }
      className=""
    />
  );
}

export default RemoveProtocolBtn;
