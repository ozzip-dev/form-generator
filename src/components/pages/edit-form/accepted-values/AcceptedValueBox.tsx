"use client";

import { removeAcceptedValueAction } from "@/actions/edit-form/accepted-values/removeAcceptedValueAction";
import { Button, Icon } from "@/components/shared";
import { useInputData } from "@/context/InputDataContextProvider";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type Props = {
  value: string | number;
};

const AcceptedValueBox = ({ value }: Props) => {
  const { formId, input } = useInputData();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useAutoLoader(isPending, "small");

  const handleRemoveAcceptedValue = () => {
    if (!formId || !input.id) return;

    startTransition(async () => {
      await removeAcceptedValueAction(formId as string, input.id!, value);
      router.refresh();
    });
  };

  return (
    <div className="flex gap-2 rounded-sm border px-3 py-1">
      <div>{value}</div>

      <Button
        type="button"
        icon={<Icon icon="trash" size={20} className="bg-font_dark" />}
        variant="ghost"
        ariaLabel="Usuń post"
        isLoading={isPending}
        onClickAction={handleRemoveAcceptedValue}
      />
    </div>
  );
};

export default AcceptedValueBox;
