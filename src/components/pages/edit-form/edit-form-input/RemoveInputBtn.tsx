"use client";

import { removeInputFromDraftAction } from "@/actions/edit-form/edit-form-input/removeInputFromDraftAction";
import { Button, Icon } from "@/components/shared";
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
        icon={<Icon icon="trash" size={20} className="bg-font_dark" />}
        variant="ghost"
        ariaLabel="Usuń pole"
        onClickAction={handleDeleteInput}
      />
    </>
  );
}

export default RemoveInputBtn;
