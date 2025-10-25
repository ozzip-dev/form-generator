import { MoveInputUp } from "@/actions/input";
import ButtonClick from "../ui/buttons/ButtonClick";
import { useParams } from "next/navigation";

type Props = {
  inputId: string;
};

const MoveInputUpBtn = (props: Props) => {
  const { formId } = useParams();

  async function handleRemoveInput(): Promise<void> {
    await MoveInputUp(formId as string, props.inputId);
  }

  return <ButtonClick message="^" onClickAction={handleRemoveInput} />;
};

export default MoveInputUpBtn;
