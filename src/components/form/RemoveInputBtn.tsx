"use client";

import { RemoveInputFromDraft } from "@/actions/create-form";
import ButtonClick from "../ui/buttons/ButtonClick";
import { useParams } from "next/navigation";
import IconTrash from "@/icons/iconTrash/IconTrash";

type Props = {
  id: string;
};

function RemoveInputBtn(props: Props) {
  const { formId } = useParams();

  async function handleRemoveInput(): Promise<void> {
    await RemoveInputFromDraft(formId as string, props.id);
  }

  return (
    <ButtonClick
      icon={<IconTrash style="h-5 w-5 bg-white" />}
      onClickAction={handleRemoveInput}
    />
  );
}

export default RemoveInputBtn;
