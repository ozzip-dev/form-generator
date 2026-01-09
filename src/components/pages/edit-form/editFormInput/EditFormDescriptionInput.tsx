import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useEditForm } from "@/hooks/useEditForm";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";

import { Button, IconTrash, InputFields } from "../../../shared";
import { editInputLabelAction } from "@/actions/edit-form/editFormInput/editInputLabelAction";
import { useAutoLoader } from "@/context/LoaderContextProvider";

type Props = {
  inputId: string;
  inputIdx: number;
  description: string;
  isParagraph: boolean;
};

const EditFormDescriptionInput = (props: Props) => {
  const [isDescriptionInput, setDescriptionInput] = useState(
    !!props.description
  );

  const dataInputDescription = [
    {
      type: "textarea",
      name: `description`,
      placeholder: "Opis",
      floatingLabel: props.isParagraph ? "Edytuj tekst" : "Edytuj opis pytania",
    },
  ];

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
  const isRemovingRef = useRef(false);

  useEffect(() => {
    if (isRemovingRef.current) {
      isRemovingRef.current = false;
    }
  }, [isLoading?.description]);

  useAutoLoader(isRemovingRef.current);
  const isDescriptionLoading = [...Object.values(isLoading)].some(Boolean);

  useAutoLoader(isDescriptionLoading, "small");

  const printDescriptionInput = () => {
    setDescriptionInput((prev) => !prev);
  };

  const handleRemoveDescriptionInput = async () => {
    setDescriptionInput((prev) => !prev);

    if (!props.description) return;

    isRemovingRef.current = true;
    handleEditLabel("description", "");
  };

  const hasDescription = !!props.description;
  const shouldShowInput = hasDescription || isDescriptionInput;
  const canAddDescription = !props.isParagraph && !shouldShowInput;

  const descriptionInput = (
    <div className="relative md:w-4/6 ">
      <InputFields
        inputsData={dataInputDescription}
        register={register}
        errorMsg={errors.header as any}
        onChange={handleEditLabel}
      />

      <div className="w-fit absolute -right-10 top-3">
        <Button
          type="button"
          icon={<IconTrash />}
          variant="icon"
          onClickAction={handleRemoveDescriptionInput}
        />
      </div>
    </div>
  );

  return (
    <>
      {shouldShowInput && descriptionInput}

      {canAddDescription && (
        <Button
          type="button"
          message="Dodaj opis pytania"
          onClickAction={printDescriptionInput}
          variant="primary-rounded"
          className="w-full md:w-4/6  mb-10"
        />
      )}

      {props.isParagraph && !shouldShowInput && descriptionInput}
    </>
  );
};

export default EditFormDescriptionInput;
