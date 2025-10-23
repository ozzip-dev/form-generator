import { MoveInputDown } from "@/actions/create-form";
import ButtonClick from "../ui/buttons/ButtonClick";
import { useParams } from "next/navigation";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import FullscreenLoader from "../ui/loaders/FullscreenLoader";

type Props = {
  inputId: string;
  isLast: boolean;
};

const MoveInputDownBtn = (props: Props) => {
  const { formId } = useParams();

  const { runAction, isLoading } = useAsyncAction(async () => {
    await MoveInputDown(formId as string, props.inputId);
  });

  return (
    <>
      {isLoading && <FullscreenLoader />}
      {!props.isLast && <ButtonClick message="v" onClickAction={runAction} />}
    </>
  );
};

export default MoveInputDownBtn;
