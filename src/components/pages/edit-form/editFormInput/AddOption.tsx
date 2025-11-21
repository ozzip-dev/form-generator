import { useFieldArray, useFormContext } from "react-hook-form";
import IconTrash from "@/icons/iconTrash/IconTrash";
import { useEditForm } from "@/hooks/useEditForm";
import editInputOptionAction from "@/actions/edit-form/editFormInput/editInputOptionAction";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { useState } from "react";
import removeInputOptionAction from "@/actions/edit-form/editFormInput/removeInputOptionAction";
import { Button, FullscreenLoader, InputFields } from "@/components/shared";

type Props = {
  inputIdx: number;
  inputId: string;
  header: string;
};

const AddOption = (props: Props) => {
  const [globalLoading, setGlobalLoading] = useState(false);

  const {
    register,
    control,
    trigger,
    formState: { errors },
  } = useFormContext();
  const formId = useSafeURLParam("formId");
  const { fields, append, remove } = useFieldArray({
    control,
    name: `options`,
  });

  const { handleEdit, isLoading } = useEditForm({
    formId,
    inputId: props.inputId,
    trigger,
    action: editInputOptionAction,
    mode: "inputOption",
  });

  const handleDeleteOption = async (optionName: string, idx: number) => {
    setGlobalLoading(true);
    try {
      await removeInputOptionAction(formId!, props.inputId, optionName);
      remove(idx);
    } catch (err) {
      console.error(err);
    } finally {
      setGlobalLoading(false);
    }
  };

  const isAnyLoading =
    globalLoading || [...Object.values(isLoading ?? {})].some(Boolean);

  return (
    <div className="ml-8 pt-4 border-t-2 border-zinc-400">
      {isAnyLoading && <FullscreenLoader />}
      {fields.map((field, idx) => {
        return (
          <div key={field.id} className="flex gap-2 items-center">
            <InputFields
              inputsData={[
                {
                  type: "text",
                  name: `options.${idx}.value`,
                  placeholder: `Opcja ${idx + 1}`,
                },
              ]}
              register={register}
              errorMsg={(errors.options as any)?.[idx]?.value}
              onChange={(_, value) => handleEdit(`options.${idx}.value`, value)}
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
            disabled={!!errors.options}
            onClickAction={() => {
              if (errors.options) return;
              append({ value: "" });
            }}
          />
        </div>
        <div className="w-fit">
          <Button message="Dodaj inne" type="button" />
        </div>
      </div>
    </div>
  );
};

export default AddOption;
