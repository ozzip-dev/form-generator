import { useParams } from "next/navigation";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { Button, FullscreenLoader } from "../../shared";
import { moveInputUpAction } from "@/actions/edit-form/moveInputActions";

type Props = {
  inputId: string;
};

const MoveInputUpBtn = (props: Props) => {
  const { formId } = useParams();

  const { runAction, isLoading } = useAsyncAction(async () => {
    await moveInputUpAction(formId as string, props.inputId);
  });

  return (
    <>
      {isLoading && <FullscreenLoader />}
      <Button type="button" message="^" onClickAction={runAction} />
    </>
  );
};

export default MoveInputUpBtn;
