import { useFieldArray, useFormContext } from "react-hook-form";
import IconTrash from "@/icons/iconTrash/IconTrash";
import { useEditForm } from "@/hooks/useEditForm";
import editInputOptionAction from "@/actions/edit-form/editFormInput/editInputOptionAction";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { startTransition, useActionState, useState } from "react";
import removeInputOptionAction from "@/actions/edit-form/editFormInput/removeInputOptionAction";
import { Button, FullscreenLoader, InputFields } from "@/components/shared";

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
      await editInputOptionAction(formId!, inputId, "Inne", OPTION_OTHER);
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

  const getInsertIndex = () => {
    const otherIndex = fields.findIndex(
      (field) => field.value === OPTION_OTHER
    );

    if (otherIndex === -1) {
      return fields.length;
    }

    return otherIndex;
  };
  console.log("fields", fields);

  const { handleEdit, isLoading } = useEditForm({
    formId,
    inputId,
    trigger,
    action: editInputOptionAction,
    mode: "inputOption",
    setError,
  });

  // const handleAddOption = () => {
  //   if (errors.options) return;
  //   append({ label: "" });
  // };

  const handleAddOption = () => {
    if (errors.options) return;

    const insertIndex = getInsertIndex();

    insert(insertIndex, {
      label: "",
    });
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

  const isAnyLoading = [...Object.values(isLoading ?? {})].some(Boolean);

  const isDisabled =
    isRemoveOptionPending || isAddOptionPending || isAnyLoading;

  return (
    <div className="ml-8 pt-4 border-t-2 border-zinc-400">
      {isDisabled && <FullscreenLoader />}
      {(fields as Record<"id" | "value", string>[]).map((field, idx) => {
        const isOther = isOptionOther(field as unknown as FormOption);

        return (
          <div
            key={field.id}
            className="flex gap-2 items-center"
            style={
              isOther ? { padding: "2px", backgroundColor: "lightskyblue" } : {}
            }
          >
            <InputFields
              inputsData={[
                {
                  type: "text",
                  name: `options.${idx}.label`,
                  placeholder: isOther ? "Inne" : `Opcja ${idx + 1}`,
                },
              ]}
              register={register}
              errorMsg={(errors.options as any)?.[idx]?.label}
              onChange={(name, value) => handleEdit(name, value)}
              isLoading={isLoading}
            />

            <div className="w-fit ml-2">
              <Button
                type="button"
                icon={<IconTrash style="h-5 w-5 bg-white" />}
                onClickAction={() =>
                  handleDeleteOption(`option.${idx}.${props.header}`, idx)
                }
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
            // disabled={!!errors.options || inputHasOther(props.input)}
            disabled={!!errors.options}
            onClickAction={handleAddOption}
          />
        </div>
        <div className="w-fit">
          <Button
            message="Dodaj inne"
            type="button"
            disabled={inputHasOther(props.input)}
            onClickAction={handleAddOther}
          />
        </div>
      </div>
    </div>
  );
};

export default AddOption;
