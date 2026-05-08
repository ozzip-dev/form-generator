import { moveInputUpAction } from "@/actions/edit-form/edit-form-input/moveInputActions";
import Icon from "@/components/shared/icons/Icon";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../../../shared";

type Props = {
  inputId: string;
  order: number;
};

const MoveInputUpBtn = ({ inputId, order }: Props) => {
  const { formId } = useParams();
  const [isPending, startTransition] = useTransition();

  useAutoLoader(isPending);

  const handleMoveUp = () => {
    startTransition(async () => {
      await moveInputUpAction(formId as string, inputId);
    });
  };

  return (
    <div>
      {" "}
      <Button
        type="button"
        onClickAction={handleMoveUp}
        icon={
          <Icon
            icon="chevron-down-solid-full"
            size={20}
            className="rotate-180 bg-font_dark"
          />
        }
        variant="ghost"
        ariaLabel={`Przenieś pole formularza numer ${order + 1} do góry`}
      />
    </div>
  );
};
export default MoveInputUpBtn;
