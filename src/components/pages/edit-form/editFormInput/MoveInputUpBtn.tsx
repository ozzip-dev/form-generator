import { useParams } from "next/navigation";
import { Button, FullscreenLoader } from "../../../shared";
import { moveInputUpAction } from "@/actions/edit-form/editFormInput/moveInputActions";
import { startTransition, useActionState } from "react";
import IconArrowDown from "@/icons/iconArrowDown/IconArrowDown";

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
      <Button
        type="button"
        onClickAction={handleMoveUp}
        icon={<IconArrowDown className="h-10 w-8 bg-font_light rotate-180" />}
        variant="icon"
      />
    </>
  );
};
export default MoveInputUpBtn;
