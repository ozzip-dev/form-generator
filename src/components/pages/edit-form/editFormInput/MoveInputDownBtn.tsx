import { useParams } from "next/navigation";
import { Button, FullscreenLoader } from "@/components/shared";
import { moveInputDownAction } from "@/actions/edit-form/editFormInput/moveInputActions";
import { startTransition, useActionState } from "react";
import Icon from "@/components/shared/icons/Icon";

type Props = {
  inputId: string;
};

const MoveInputDownBtn = (props: Props) => {
  const { formId } = useParams();

  const [_, moveDown, isPending] = useActionState(async () => {
    await moveInputDownAction(formId as string, props.inputId);
  }, null);

  const handleMoveDown = () => {
    startTransition(moveDown);
  };

  return (
    <>
      {isPending && <FullscreenLoader />}
      <Button
        type="button"
        icon={<Icon icon="chevron-down-solid-full" size={20} />}
        variant="icon"
        onClickAction={handleMoveDown}
      />
    </>
  );
};

export default MoveInputDownBtn;
