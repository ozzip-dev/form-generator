import { useParams } from "next/navigation";
import { Button, FullscreenLoader } from "../../../shared";
import { moveInputUpAction } from "@/actions/edit-form/editFormInput/moveInputActions";
import { startTransition, useActionState } from "react";
import Icon from "@/components/shared/icons/Icon";
import { useAutoLoader } from "@/context/LoaderContextProvider";

type Props = {
  inputId: string;
};

const MoveInputUpBtn = ({ inputId }: Props) => {
  const { formId } = useParams();

  const [_, moveUp, isPending] = useActionState(async () => {
    return await moveInputUpAction(formId as string, inputId);
  }, null);

  useAutoLoader(isPending);

  const handleMoveUp = () => {
    startTransition(moveUp);
  };

  return (
    <Button
      type="button"
      onClickAction={handleMoveUp}
      icon={
        <Icon icon="chevron-down-solid-full" size={20} className="rotate-180" />
      }
      variant="icon"
    />
  );
};
export default MoveInputUpBtn;
