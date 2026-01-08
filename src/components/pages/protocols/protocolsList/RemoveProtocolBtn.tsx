"use client";

import { removeProtocolAction } from "@/actions/protocol";
import { Button, FullscreenLoader, IconTrash } from "@/components/shared";
import { confirmAction } from "@/helpers/confirmAction";
import { startTransition, useActionState } from "react";

type Props = {
  ProtocolId: string;
};

function RemoveProtocolBtn(props: Props) {
  const [_, deleteProtocol, isPending] = useActionState(async () => {
    await removeProtocolAction(props.ProtocolId);
  }, null);

  const handleDeleteProtocol = () => {
    confirmAction({
      action: () => startTransition(deleteProtocol),
      confirmText: "Usunąć protokół?",
    });
  };

  return (
    <>
      {isPending && <FullscreenLoader />}

      <Button
        type="button"
        icon={<IconTrash />}
        variant="primary-rounded"
        onClickAction={handleDeleteProtocol}
        className="!bg-error"
      />
    </>
  );
}

export default RemoveProtocolBtn;
