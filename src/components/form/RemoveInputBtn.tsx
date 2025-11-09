"use client";

import { useAsyncAction } from "@/hooks/useAsyncAction";
import IconTrash from "@/icons/iconTrash/IconTrash";
import { useParams } from "next/navigation";
import { RemoveInputFromDraftAction } from "@/actions/edit-form/RemoveInputFromDraftAction";
import { Button, FullscreenLoader } from "../shared";

type Props = {
  inputId: string;
};

function RemoveInputBtn(props: Props) {
  const { formId } = useParams();

  const { runAction, isLoading } = useAsyncAction(async () => {
    await RemoveInputFromDraftAction(formId as string, props.inputId);
  });

  return (
    <>
      {isLoading && <FullscreenLoader />}

      <Button
        type="button"
        icon={<IconTrash style="h-5 w-5 bg-white" />}
        onClickAction={runAction}
      />
    </>
  );
}

export default RemoveInputBtn;
