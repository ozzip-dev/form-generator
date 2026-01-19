"use client";

import MoveInputUpBtn from "./MoveInputUpBtn";
import MoveInputDownBtn from "./MoveInputDownBtn";
import RemoveInputBtn from "./RemoveInputBtn";

type Props = {
  inputId: string;
  isFirstInput: boolean;
  isLastInput: boolean;
};

function FormInputMoveRemoveButtons(props: Props) {
  return (
    <div className="flex flex-col gap-14 order-last md:ml-auto">
      <div className="flex gap-8 mb-14 h-fit">
        <div className="ml-auto flex gap-4">
          {!props.isFirstInput && <MoveInputUpBtn inputId={props.inputId} />}
          {!props.isLastInput && <MoveInputDownBtn inputId={props.inputId} />}
        </div>
        <div className="flex flex-col">
          <div className="flex-1 w-px  bg-font_light" />
        </div>

        <div className="mb-auto">
          <RemoveInputBtn inputId={props.inputId} />
        </div>
      </div>
    </div>
  );
}

export default FormInputMoveRemoveButtons;
