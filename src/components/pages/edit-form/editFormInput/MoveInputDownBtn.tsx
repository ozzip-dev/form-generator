import { useParams } from "next/navigation";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { moveInputDownAction } from "@/actions/edit-form/moveInputActions";
import { Button, FullscreenLoader } from "@/components/shared";

type Props = {
  inputId: string;
};

const MoveInputDownBtn = (props: Props) => {
  const { formId } = useParams();

  const { runAction, isLoading } = useAsyncAction(async () => {
    await moveInputDownAction(formId as string, props.inputId);
  });

  return (
    <>
      {isLoading && <FullscreenLoader />}

      <Button type="button" message="v" onClickAction={runAction} />
    </>
  );
};

export default MoveInputDownBtn;
