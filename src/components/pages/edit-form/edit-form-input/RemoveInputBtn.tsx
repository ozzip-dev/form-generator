"use client";

import { removeInputFromDraftAction } from "@/actions/edit-form/edit-form-input/removeInputFromDraftAction";
import { Button, IconTrash } from "@/components/shared";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useParams } from "next/navigation";
import { useTransition } from "react";

type Props = {
  inputId: string;
};

function RemoveInputBtn(props: Props) {
  const { formId } = useParams();
  const [isPending, startTransition] = useTransition();
  useAutoLoader(isPending);

  const handleDeleteInput = () => {
    startTransition(async () => {
      await removeInputFromDraftAction(formId as string, props.inputId);
    });
  };

  return (
    <>
      <Button
        type="button"
        icon={<IconTrash />}
        variant="ghost"
        onClickAction={handleDeleteInput}
      />
    </>
  );
}

export default RemoveInputBtn;
