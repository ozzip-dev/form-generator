"use client";

import MoveInputUpBtn from "./MoveInputUpBtn";
import MoveInputDownBtn from "./MoveInputDownBtn";
import RemoveInputBtn from "./RemoveInputBtn";

type Props = {
  inputId: string;
  isFirstInput: boolean;
  isLastInput: boolean;
  setDescription:any;
  setEditor:any
  isDescription: any
};

function FormInputMoveRemoveButtons(props: Props) {


  return (
   
      <div className="flex gap-4 mb-8">
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
    
  );
}

export default FormInputMoveRemoveButtons;
