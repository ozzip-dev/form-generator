import { editInputLabelAction } from "@/actions/edit-form/editFormInput/editInputLabelAction";
import { useEditForm } from "@/hooks/useEditForm";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import IconTrash from "@/icons/iconTrash/IconTrash";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button, FullscreenLoader, InputFields } from "../../../shared";

const dataInputDescription = [
  {
    type: "textarea",
    name: `description`,
    placeholder: "Opis",
    label: "Edytuj opis pytania",
  },
];

type Props = {
  inputId: string;
  inputIdx: number;
  description: string;
  isParagraph: boolean;
};

const EditFormDescriptionInput = (props: Props) => {
  const [isDeleting, setDeleting] = useState(false);

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
    setDeleting(false);
  };
  const handleRemoveDescriptionInput = () => {
    setDeleting(true);
    handleEditLabel("description", "");
  };

  const isRemoveLoading = isDeleting && isLoading?.description === true;

  useEffect(() => {
    if (isRemoveLoading) {
      setDescriptionInput((prev) => !prev);
    }
  }, [isRemoveLoading]);

  const hasDescription = !!props.description;
  const shouldShowInput = hasDescription || isDescriptionInput;
  const canAddDescription = !props.isParagraph && !shouldShowInput;

  const descriptionInput = (
    <InputFields
      inputsData={dataInputDescription}
      register={register}
      errorMsg={errors.header as any}
      onChange={handleEditLabel}
    />
  );

  return (
    <>
      {isRemoveLoading && <FullscreenLoader />}

      {shouldShowInput && (
        <div className="flex gap-2">
          {descriptionInput}
          <Button
            type="button"
            icon={<IconTrash style="h-10 w-8 bg-font_light" />}
            variant="icon"
            onClickAction={handleRemoveDescriptionInput}
          />
        </div>
      )}

      {canAddDescription && (
        <Button
          type="button"
          message="Dodaj opis pytania"
          onClickAction={printDescriptionInput}
          variant="primary-rounded"
        />
      )}

      {props.isParagraph && !shouldShowInput && descriptionInput}
    </>
  );
};

export default EditFormDescriptionInput;
