import { moveInputUpAction } from "@/actions/edit-form/editFormInput/moveInputActions";
import Icon from "@/components/shared/icons/Icon";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../../../shared";

type Props = {
  inputId: string;
};

const MoveInputUpBtn = ({ inputId }: Props) => {
  const { formId } = useParams();
  const [isPending, startTransition] = useTransition();

  useAutoLoader(isPending);

  const handleMoveUp = () => {
    startTransition(async () => {
      await moveInputUpAction(formId as string, inputId);
    });
  };

  return (
    <Button
      type="button"
      onClickAction={handleMoveUp}
      icon={
        <Icon icon="chevron-down-solid-full" size={20} className="rotate-180" />
      }
      variant="ghost"
    />
  );
};
export default MoveInputUpBtn;
