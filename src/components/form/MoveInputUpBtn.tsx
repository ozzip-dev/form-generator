import { MoveInputUp } from "@/actions/input";
import ButtonClick from "../ui/buttons/ButtonClick";
import { useParams } from "next/navigation";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import FullscreenLoader from "../ui/loaders/FullscreenLoader";

type Props = {
  inputId: string;
  removeBtn: number;
};

const MoveInputUpBtn = (props: Props) => {
  const { formId } = useParams();

  const { runAction, isLoading } = useAsyncAction(async () => {
    await MoveInputUp(formId as string, props.inputId);
  });

  return (
    <>
      {isLoading && <FullscreenLoader />}
      {props.removeBtn > 0 && (
        <ButtonClick message="^" onClickAction={runAction} />
      )}{" "}
    </>
  );
};

export default MoveInputUpBtn;
