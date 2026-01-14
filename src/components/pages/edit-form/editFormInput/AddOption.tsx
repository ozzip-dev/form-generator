import { editInputOptionAction } from "@/actions/edit-form/editFormInput/editInputOptionAction";
import removeInputOptionAction from "@/actions/edit-form/editFormInput/removeInputOptionAction";
import { Button, IconTrash, InputFields } from "@/components/shared";
import { useEditForm } from "@/hooks/useEditForm";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { useTransition } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { useAutoLoader } from "@/context/LoaderContextProvider";
import {
  inputHasOther,
  isOptionOther,
  OPTION_OTHER,
} from "@/helpers/inputHelpers";
import { FormInput, FormOption } from "@/types/input";

type Props = {
  inputIdx: number;
  input: FormInput;
  header: string;
};

const AddOption = (props: Props) => {
  const [isPending, startTransition] = useTransition();
  const inputId = props.input.id!;
  const formId = useSafeURLParam("formId");

  const {
    register,
    control,
    trigger,
    formState: { errors },
    setError,
  } = useFormContext();

  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: `options`,
  });

  useAutoLoader(isPending);

  const { handleEdit, isLoading } = useEditForm({
    formId,
    inputId,
    trigger,
    action: editInputOptionAction,
    mode: "inputOption",
    setError,
  });

  const isAnyLoading = [...Object.values(isLoading ?? {})].some(Boolean);
  useAutoLoader(isAnyLoading, "small");

  const getInsertIndex = () => {
    const otherIndex = fields.findIndex(
      (field) => (field as any).value === OPTION_OTHER
    );
    return otherIndex === -1 ? fields.length : otherIndex;
  };

  const handleAddOption = () => {
    if (errors.options) return;

    const insertIndex = getInsertIndex();
    insert(insertIndex, { value: `option-${Date.now()}`, label: "" });
  };

  const handleAddOther = () => {
    startTransition(async () => {
      await editInputOptionAction(formId!, inputId, "Inne", OPTION_OTHER, true);
      append({ value: OPTION_OTHER, label: "Inne" });
    });
  };

  const handleDeleteOption = (optionName: string, idx: number) => {
    startTransition(async () => {
      await removeInputOptionAction(formId!, inputId, optionName);
      remove(idx);
    });
  };

  const hasReachedOptionLimit =
    fields?.length >= Number(process.env.maxOptionsPerInput || 20);

  return (
    <div className="sm:w-5/6 md:w-3/6">
      {(fields as Record<"id" | "value", string>[]).map((field, idx) => {
        const isOtherOption = isOptionOther(field as unknown as FormOption);

        return (
          <div
            key={field.id}
            className="w-[calc(100%-3rem)] sm:w-full relative"
          >
            <InputFields
              inputsData={[
                {
                  type: "text",
                  name: `options.${idx}.label`,
                  floatingLabel: isOtherOption ? "Edytuj inne" : "Edytuj opcję",
                },
              ]}
              register={register}
              errorMsg={(errors.options as any)?.[idx]?.label}
              onChange={(name, value) => {
                handleEdit(name, value, isOtherOption);
              }}
            />
            <Button
              type="button"
              icon={<IconTrash />}
              onClickAction={() =>
                handleDeleteOption(`option.${idx}.${props.header}`, idx)
              }
              variant="ghost"
              className="w-fit !absolute top-2 -right-10"
            />
          </div>
        );
      })}

      <div className="flex gap-2">
        <div className="w-fit mb-10">
          <Button
            message={"Dodaj opcję"}
            type="button"
            disabled={!!errors.options || hasReachedOptionLimit}
            onClickAction={handleAddOption}
            variant="primary-rounded"
          />
        </div>
        {!inputHasOther(props.input) && (
          <div className="w-fit">
            <Button
              message="Dodaj inne"
              type="button"
              disabled={hasReachedOptionLimit}
              onClickAction={handleAddOther}
              variant="primary-rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddOption;
