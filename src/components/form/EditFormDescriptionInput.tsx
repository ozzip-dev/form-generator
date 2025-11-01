import { useState } from "react";
import InputFields from "../inputs/InputFields";
import { useFormContext } from "react-hook-form";
import { useEditForm } from "@/hooks/useEditForm";
import { EditInputLabelAction } from "@/actions/edit-form/EditInputLabelAction";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import FullscreenLoader from "../ui/loaders/FullscreenLoader";
import IconTrash from "@/icons/iconTrash/IconTrash";
import Button from "../ui/buttons/Button";
import { az } from "zod/v4/locales";

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
    setError,
  } = useFormContext();

  const { handleEdit: handleEditLabel, isLoading } = useEditForm({
    formId,
    inputId: props.inputId,
    inputIdx: props.inputIdx,
    trigger,
    action: EditInputLabelAction,
    mode: "inputLabel",
  });

  const printDescriptionInput = () => {
    setDescriptionInput((prev) => !prev);
  };

  const handleDescriptionInput = async () => {
    setDescriptionInput((prev) => !prev);

    if (!props.description) return;

    handleEditLabel("description", "");
  };

  const dataInputDescription = [
    {
      type: "text",
      name: `inputs.${props.inputIdx}.description`,
      placeholder: "Pytanie",
      label: "Edytuj opis pytania",
    },
  ];

  const loadingForm = [...Object.values(isLoading ?? {})].some(Boolean);

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
          <div className="w-fit flex items-center">
            <Button
              type="button"
              icon={<IconTrash style="h-5 w-5 bg-white" />}
              onClickAction={handleDescriptionInput}
            />
          </div>
        </div>
      ) : (
        <Button
          type="button"
          message="Dodaj opis pytania"
          onClickAction={printDescriptionInput}
        />
      )}
    </>
  );
};

export default EditFormDescriptionInput;
