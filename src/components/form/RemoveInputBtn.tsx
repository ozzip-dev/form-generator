"use client";

import { RemoveInputFromDraft } from "@/actions/create-form";
import ButtonClick from "../ui/buttons/ButtonClick";
import { useParams } from "next/navigation";

type Props = {
  id: string;
};

function RemoveInputBtn(props: Props) {
  const { formId } = useParams();

  async function handleRemoveInput(): Promise<void> {
    await RemoveInputFromDraft(formId as string, props.id);
  }

  return <ButtonClick text="X" onClickAction={handleRemoveInput} />;
}

export default RemoveInputBtn;
