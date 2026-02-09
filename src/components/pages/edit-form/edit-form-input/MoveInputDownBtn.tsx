import { moveInputDownAction } from "@/actions/edit-form/edit-form-input/moveInputActions";
import { Button } from "@/components/shared";
import Icon from "@/components/shared/icons/Icon";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useParams } from "next/navigation";
import { useTransition } from "react";

type Props = {
  inputId: string;
};

const MoveInputDownBtn = (props: Props) => {
  const { formId } = useParams();
  const [isPending, startTransition] = useTransition();

  useAutoLoader(isPending);

  const handleMoveDown = () => {
    startTransition(async () => {
      await moveInputDownAction(formId as string, props.inputId);
    });
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
