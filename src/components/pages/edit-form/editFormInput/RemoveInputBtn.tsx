"use client";

import { removeInputFromDraftAction } from "@/actions/edit-form/editFormInput/removeInputFromDraftAction";
import { Button, IconTrash } from "@/components/shared";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useParams } from "next/navigation";
import { startTransition, useActionState } from "react";

type Props = {
  inputId: string;
};

function RemoveInputBtn(props: Props) {
  const { formId } = useParams();
  const [_, deleteInput, isPending] = useActionState(async () => {
    await removeInputFromDraftAction(formId as string, props.inputId);
  }, null);

  useAutoLoader(isPending);

  const handleDeleteInput = () => {
    startTransition(deleteInput);
  };

  return (
    <>
      <Button
        type="button"
        icon={<IconTrash />}
        variant="icon"
        onClickAction={handleDeleteInput}
      />
    </>
  );
}

export default RemoveInputBtn;
