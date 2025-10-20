import { MoveInputUp } from "@/actions/create-form";
import ButtonClick from "../ui/buttons/ButtonClick";
import { useParams } from "next/navigation";

type Props = {
  inputId: string;
  removeBtn: number;
};

const MoveInputUpBtn = (props: Props) => {
  const { formId } = useParams();

  async function handleRemoveInput(): Promise<void> {
    await MoveInputUp(formId as string, props.inputId);
  }

  return (
    <>
      {" "}
      {props.removeBtn > 0 && (
        <ButtonClick message="^" onClickAction={handleRemoveInput} />
      )}{" "}
    </>
  );
};

export default MoveInputUpBtn;
