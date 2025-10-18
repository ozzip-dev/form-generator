import { MoveInputDown } from "@/actions/create-form";
import ButtonClick from "../ui/buttons/ButtonClick";
import { useParams } from "next/navigation";

type Props = {
  inputId: string;
  isLast: boolean;
};

const MoveInputDownBtn = (props: Props) => {
  const { formId } = useParams();

  async function handleRemoveInput(): Promise<void> {
    await MoveInputDown(formId as string, props.inputId);
  }

  return (
    <>
      {!props.isLast && (
        <ButtonClick text="v" onClickAction={handleRemoveInput} />
      )}
    </>
  );
};

export default MoveInputDownBtn;
