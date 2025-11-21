import { useParams } from "next/navigation";
import { Button, FullscreenLoader } from "@/components/shared";
import { moveInputDownAction } from "@/actions/edit-form/editFormInput/moveInputActions";
import { startTransition, useActionState } from "react";

type Props = {
  inputId: string;
};

const MoveInputDownBtn = (props: Props) => {
  const { formId } = useParams();

  const [state, moveDown, isPending] = useActionState(async () => {
    await moveInputDownAction(formId as string, props.inputId);
  }, null);

  const handleMoveDown = () => {
    startTransition(moveDown);
  };

  return (
    <>
      {isPending && <FullscreenLoader />}

      <Button type="button" message="v" onClickAction={handleMoveDown} />
    </>
  );
};

export default MoveInputDownBtn;
