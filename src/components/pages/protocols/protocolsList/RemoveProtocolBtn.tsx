"use client";

import { removeProtocolAction } from "@/actions/protocol";
import { Button, FullscreenLoader, IconTrash } from "@/components/shared";
import { useModal } from "@/context/ModalContextProvider";
import { useToast } from "@/context/ToastProvider";
import { confirmAction } from "@/helpers/confirmAction";
import { startTransition, useActionState } from "react";

type Props = {
  ProtocolId: string;
};

function RemoveProtocolBtn(props: Props) {
  const { openModal } = useModal();

  const [_, deleteProtocol, isPending] = useActionState(async () => {
    await removeProtocolAction(props.ProtocolId);
  }, null);

  return (
    <>
      {isPending && <FullscreenLoader />}

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
    </>
  );
}

export default RemoveProtocolBtn;
