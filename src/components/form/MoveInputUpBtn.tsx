import { MoveInputUp } from "@/actions/edit-form/MoveInputActions";
import { useParams } from "next/navigation";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { Button, FullscreenLoader } from "../shared";

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
