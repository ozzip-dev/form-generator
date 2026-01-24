"use client";

import MoveInputUpBtn from "./MoveInputUpBtn";
import MoveInputDownBtn from "./MoveInputDownBtn";
import RemoveInputBtn from "./RemoveInputBtn";
import { useInputData } from "@/context/InputDataContextProvider";



function FormInputMoveRemoveButtons() {
  const { input, isLastInput } = useInputData()
  const inputId = input.id!
  const isFirstInput = input.order === 0


  return (

    <div className="flex gap-4 mb-4">
      <div className="ml-auto flex gap-4">
        {!isFirstInput && <MoveInputUpBtn inputId={inputId} />}
        {!isLastInput && <MoveInputDownBtn inputId={inputId} />}
      </div>
      <div className="flex flex-col">
        <div className="flex-1 w-px  bg-font_light" />
      </div>

      <div className="mb-auto">
        <RemoveInputBtn inputId={inputId} />
      </div>
    </div>

  );
}

export default FormInputMoveRemoveButtons;
