import { useState } from "react";
import InputFields from "../inputs/InputFields";
import { useFormContext } from "react-hook-form";
import { useEditForm } from "@/hooks/useEditForm";
import { EditInputLabelAction } from "@/actions/edit-form/EditInputLabelAction";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import FullscreenLoader from "../ui/loaders/FullscreenLoader";

type Props = {
  inputId: string;
  inputIdx: number;
  description: string;
};

const EditFormDescriptionInput = (props: Props) => {
  const [isDescriptionInput, setDescriptionInput] = useState(
    !!props.description
  );

  const formId = useSafeURLParam("formId");
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();

  const { handleEdit: handleEditLabel, isLoading } = useEditForm({
    formId,
    inputId: props.inputId,
    trigger,
    action: EditInputLabelAction,
    mode: "inputLabel",
  });

  const handleDescriptionInput = () => {
    setDescriptionInput((prev) => !prev);
  };

  const dataInputDescription = [
    {
      type: "text",
      name: `inputs.${props.inputIdx}.description`,
      placeholder: "Nazwa pola",
    },
  ];

  const loadingForm = [...Object.values(isLoading ?? {})].some(Boolean);

  console.log("", isLoading);
  return (
    <>
      {loadingForm && <FullscreenLoader />}
      {props.description || isDescriptionInput ? (
        <div className="flex gap-2">
          <InputFields
            inputsData={dataInputDescription}
            register={register}
            errorMsg={(errors.inputs as any)?.[props.inputIdx]?.description}
            onChange={handleEditLabel}
          />

          <button
            type="button"
            onClick={async () => {
              setDescriptionInput((prev) => !prev);

              if (!props.description) return;

              handleEditLabel("description", "");
            }}
          >
            X
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="text-sm"
          onClick={handleDescriptionInput}
        >
          Dodaj opis pola
        </button>
      )}
    </>
  );
};

export default EditFormDescriptionInput;
