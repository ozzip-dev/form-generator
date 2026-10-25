"use client";

import MoveInputUpBtn from "./MoveInputUpBtn";
import MoveInputDownBtn from "./MoveInputDownBtn";
import RemoveInputBtn from "./RemoveInputBtn";
import { useInputData } from "@/context/InputDataContextProvider";

function FormInputMoveRemoveButtons() {
  const { input, isLastInput } = useInputData();
  const inputId = input.id!;
  const isFirstInput = input.order === 0;

  return (
    <div className="flex gap-4">
      <div className="ml-auto flex gap-4">
        {!isFirstInput && (
          <MoveInputUpBtn inputId={inputId} order={input.order} />
        )}
        {!isLastInput && (
          <MoveInputDownBtn inputId={inputId} order={input.order} />
        )}
      </div>
      <div className="flex flex-col">
        <div className="bg-font-light w-px flex-1" />
      </div>

      <div className="mb-auto">
        <RemoveInputBtn inputId={inputId} />
      </div>
    </div>
  );
}

export default FormInputMoveRemoveButtons;
