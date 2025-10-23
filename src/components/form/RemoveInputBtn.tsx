"use client";

import { RemoveInputFromDraft } from "@/actions/create-form";
import ButtonClick from "../ui/buttons/ButtonClick";
import { useParams } from "next/navigation";
import IconTrash from "@/icons/iconTrash/IconTrash";
import { useState } from "react";
import FullscreenLoader from "../ui/loaders/FullscreenLoader";

type Props = {
  id: string;
};

function RemoveInputBtn(props: Props) {
  const { formId } = useParams();
  const [isLoading, setLoading] = useState(false);

  async function handleRemoveInput(): Promise<void> {
    setLoading(true);
    try {
      await RemoveInputFromDraft(formId as string, props.id);
    } catch (err) {
      throw new Error(`${err}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {isLoading && <FullscreenLoader />}
      <ButtonClick
        icon={<IconTrash style="h-5 w-5 bg-white" />}
        onClickAction={handleRemoveInput}
      />
    </>
  );
}

export default RemoveInputBtn;
