import { useFieldArray, useFormContext } from "react-hook-form";
import { useEditForm } from "@/hooks/useEditForm";
import { editInputOptionAction } from "@/actions/edit-form/editFormInput/editInputOptionAction";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { startTransition, useActionState, useState } from "react";
import removeInputOptionAction from "@/actions/edit-form/editFormInput/removeInputOptionAction";
import {
  Button,
  FullscreenLoader,
  InputFields,
  IconTrash,
} from "@/components/shared";

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
  const inputId = props.input.id!;
  const formId = useSafeURLParam("formId");

  const [_, removeOption, isRemoveOptionPending] = useActionState<null, string>(
    async (_state, optionName) => {
      await removeInputOptionAction(formId!, inputId, optionName);
      return null;
    },
    null
  );

  const [__, addOtherOption, isAddOptionPending] = useActionState<null>(
    async (_state) => {
      await editInputOptionAction(formId!, inputId, "Inne", OPTION_OTHER, true);
      return null;
    },
    null
  );

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

  const { handleEdit, isLoading } = useEditForm({
    formId,
    inputId,
    trigger,
    action: editInputOptionAction,
    mode: "inputOption",
    setError,
  });

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
    startTransition(() => {
      addOtherOption();
      append({ value: OPTION_OTHER, label: "Inne" });
    });
  };

  const handleDeleteOption = (optionName: string, idx: number) => {
    remove(idx);
    startTransition(() => {
      removeOption(optionName);
    });
  };

  const isDisabled = isRemoveOptionPending || isAddOptionPending;

  return (
    <div className="flex flex-col gap-8">
      {isDisabled && <FullscreenLoader />}
      {(fields as Record<"id" | "value", string>[]).map((field, idx) => {
        const isOtherOption = isOptionOther(field as unknown as FormOption);

        return (
          <div key={field.id} className="relative">
            <div className="w-full ">
              <InputFields
                inputsData={[
                  {
                    type: "text",
                    name: `options.${idx}.label`,
                    label: isOtherOption ? "Edytuj inne" : "Edytuj opcję",
                    // placeholder: isOtherOption ? "Inne" : `Opcja ${idx + 1}`,
                  },
                ]}
                register={register}
                errorMsg={(errors.options as any)?.[idx]?.label}
                onChange={(name, value) => {
                  handleEdit(name, value, isOtherOption);
                }}
                // isLoading={isLoading}
              />
            </div>
            <div className="w-fit absolute -right-10 top-3">
              <Button
                type="button"
                icon={<IconTrash />}
                onClickAction={() =>
                  handleDeleteOption(`option.${idx}.${props.header}`, idx)
                }
                variant="icon"
              />
            </div>
          </div>
        );
      })}

      <div className="flex gap-2">
        <div className="w-fit">
          <Button
            message={"Dodaj opcję"}
            type="button"
            disabled={!!errors.options}
            onClickAction={handleAddOption}
            variant="primary-rounded"
          />
        </div>
        {!inputHasOther(props.input) && (
          <div className="w-fit">
            <Button
              message="Dodaj inne"
              type="button"
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
