import { MoveInputUp } from "@/actions/edit-form/MoveInputActions";
import { useParams } from "next/navigation";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import FullscreenLoader from "../ui/loaders/FullscreenLoader";
import Button from "../ui/buttons/Button";

type Props = {
  inputId: string;
};

const MoveInputUpBtn = (props: Props) => {
  const { formId } = useParams();

  const { runAction, isLoading } = useAsyncAction(async () => {
    await MoveInputUp(formId as string, props.inputId);
  });

  return (
    <>
      {isLoading && <FullscreenLoader />}
      <Button type="button" message="^" onClickAction={runAction} />
    </>
  );
};

export default MoveInputUpBtn;
