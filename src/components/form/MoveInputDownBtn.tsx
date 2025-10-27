import { MoveInputDown } from "@/actions/input";
import { useParams } from "next/navigation";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import FullscreenLoader from "../ui/loaders/FullscreenLoader";
import Button from "../ui/buttons/Button";

type Props = {
  inputId: string;
};

const MoveInputDownBtn = (props: Props) => {
  const { formId } = useParams();

  const { runAction, isLoading } = useAsyncAction(async () => {
    await MoveInputDown(formId as string, props.inputId);
  });

  return (
    <>
      {isLoading && <FullscreenLoader />}

      <Button type="button" message="v" onClickAction={runAction} />
    </>
  );
};

export default MoveInputDownBtn;
