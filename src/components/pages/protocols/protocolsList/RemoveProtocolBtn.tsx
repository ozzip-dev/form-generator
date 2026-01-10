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

  const [_, deleteProtocol, isPending] = useActionState(async () => {
    await removeProtocolAction(props.ProtocolId);
  }, null);

  useAutoLoader(isPending);

  return (
    <Button
      type="button"
      icon={<IconTrash />}
      variant="primary-rounded"
      onClickAction={() =>
        openModal({
          action: () => startTransition(deleteProtocol),
          header: "Usunąć protokuł?",
        })
      }
      className="!bg-error"
    />
  );
}

export default RemoveProtocolBtn;
