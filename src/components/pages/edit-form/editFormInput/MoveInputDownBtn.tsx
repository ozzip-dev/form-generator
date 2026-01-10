import { moveInputDownAction } from "@/actions/edit-form/editFormInput/moveInputActions";
import { Button } from "@/components/shared";
import Icon from "@/components/shared/icons/Icon";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useParams } from "next/navigation";
import { startTransition, useActionState } from "react";

type Props = {
  inputId: string;
};

const MoveInputDownBtn = (props: Props) => {
  const { formId } = useParams();

  const [_, moveDown, isPending] = useActionState(async () => {
    await moveInputDownAction(formId as string, props.inputId);
  }, null);

  useAutoLoader(isPending);

  const handleMoveDown = () => {
    startTransition(moveDown);
  };

  return (
    <Button
      type="button"
      icon={<Icon icon="chevron-down-solid-full" size={20} />}
      onClickAction={handleMoveDown}
      variant="ghost"
    />
  );
};

export default MoveInputDownBtn;
