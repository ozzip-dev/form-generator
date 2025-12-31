import { useParams } from "next/navigation";
import { Button, FullscreenLoader } from "@/components/shared";
import { moveInputDownAction } from "@/actions/edit-form/editFormInput/moveInputActions";
import { startTransition, useActionState } from "react";
import IconArrowDown from "@/icons/iconArrowDown/IconArrowDown";

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
        icon={<IconArrowDown className="h-10 w-8 bg-font_light" />}
        variant="icon"
        onClickAction={handleMoveDown}
      />
    </>
  );
};

export default MoveInputDownBtn;
