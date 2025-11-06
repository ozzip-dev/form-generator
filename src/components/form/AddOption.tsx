import { useFormContext } from "react-hook-form";
import InputFields from "../inputs/InputFields";
import Button from "../ui/buttons/Button";
import { useEffect, useState } from "react";
import IconTrash from "@/icons/iconTrash/IconTrash";
import { watch } from "fs";
import { useEditForm } from "@/hooks/useEditForm";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import EditInputOptionAction from "@/actions/edit-form/EditInputOptionAction";
import FullscreenLoader from "../ui/loaders/FullscreenLoader";

type Props = {
  header: string;
  inputId: string;
};

const AddOption = (props: Props) => {
  const formId = useSafeURLParam("formId");
  const {
    register,
    formState: { errors },
    trigger,
    control,
    setError,
    watch,
  } = useFormContext();

  const [options, setOptions] = useState([
    {
      type: "text",
      name: `option.0.${props.header}`,
      placeholder: "Opcja 1",
    },
  ]);

  const { handleEdit, isLoading } = useEditForm({
    formId,
    inputId: props.inputId,
    trigger,
    action: EditInputOptionAction,
    mode: "inputOption",
  });

  // useEffect(() => {
  //   const subscription = watch((values) => {
  //     console.log("Aktualne wartości:", values);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  const handleAddOption = () => {
    const nextIndex = options.length;
    setOptions([
      ...options,
      {
        type: "text",
        name: `option.${nextIndex}.${props.header}`,
        placeholder: `Opcja ${nextIndex + 1}`,
      },
    ]);
  };

  const handleDeleteOption = (optionName: string) => {
    setOptions((prev) => {
      const filtered = prev.filter((item) => item.name !== optionName);
      return filtered.map((item, index) => ({
        ...item,
        name: `option.${index}.${props.header}`,
        placeholder: `Opcja ${index + 1}`,
      }));
    });
  };

  const isAnyLoading = [...Object.values(isLoading ?? {})].some(Boolean);
  return (
    <div className="ml-8  pt-4 border-t-2 border-zinc-400">
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          return (
            <div key={option.name} className="flex">
              {isAnyLoading && <FullscreenLoader />}
              <InputFields
                inputsData={[option]}
                register={register}
                //   errorMsg={(errors.inputs as any)?.[props.inputIdx]?.header}
                onChange={handleEdit}
              />
              <div className="w-fit ml-2">
                <Button
                  type="button"
                  icon={<IconTrash style="h-5 w-5 bg-white" />}
                  onClickAction={() => handleDeleteOption(option.name)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-fit">
        <Button
          message="Dodaj opcję do wyboru"
          type="button"
          onClickAction={handleAddOption}
        />
      </div>
    </div>
  );
};

export default AddOption;
