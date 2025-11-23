import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useEditForm } from "@/hooks/useEditForm";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import IconTrash from "@/icons/iconTrash/IconTrash";
import {
  Button,
  FullscreenLoader,
  InputFields,
  TextareaFields,
} from "../../../shared";
import { editInputLabelAction } from "@/actions/edit-form/editFormInput/editInputLabelAction";

const dataInputDescription = [
  {
    type: "text",
    name: `description`,
    placeholder: "Opis",
    label: "Edytuj opis pytania",
  },
];

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
    action: editInputLabelAction,
    mode: "inputLabel",
    setError,
  });

  const printDescriptionInput = () => {
    setDescriptionInput((prev) => !prev);
  };

  const handleRemoveDescriptionInput = async () => {
    setDescriptionInput((prev) => !prev);

    if (!props.description) return;

    await handleEditLabel("description", "");
  };

  const loadingForm = [...Object.values(isLoading ?? {})].some(Boolean);

  return (
    <>
      {loadingForm && <FullscreenLoader />}
      {props.description || isDescriptionInput ? (
        <div className="flex gap-2">
          <TextareaFields
            inputsData={dataInputDescription}
            register={register}
            errorMsg={errors?.description as any}
            onChange={handleEditLabel}
          />
          <div className="w-fit flex items-center">
            <Button
              type="button"
              icon={<IconTrash style="h-5 w-5 bg-white" />}
              onClickAction={handleRemoveDescriptionInput}
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
