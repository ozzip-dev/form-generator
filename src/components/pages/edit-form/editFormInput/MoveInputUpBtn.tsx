import { useParams } from "next/navigation";
import { Button, FullscreenLoader } from "../../../shared";
import { moveInputUpAction } from "@/actions/edit-form/editFormInput/moveInputActions";
import { startTransition, useActionState } from "react";

type Props = {
  inputId: string;
};

const MoveInputUpBtn = ({ inputId }: Props) => {
  const { formId } = useParams();

  const [state, moveUp, isPending] = useActionState(async () => {
    return await moveInputUpAction(formId as string, inputId);
  }, null);

  const handleMoveUp = () => {
    startTransition(moveUp);
  };

  return (
    <>
      {isPending && <FullscreenLoader />}
      <Button type="button" message="^" onClickAction={handleMoveUp} />
    </>
  );
};
export default MoveInputUpBtn;
