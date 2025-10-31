import { useFormContext } from "react-hook-form";
import InputFields from "../inputs/InputFields";
import Button from "../ui/buttons/Button";
import { az } from "zod/v4/locales";
import { useState } from "react";
import IconTrash from "@/icons/iconTrash/IconTrash";

type Props = {
  header: string;
};

const AddOption = (props: Props) => {
  const {
    register,
    formState: { errors },
    trigger,
    control,
    setError,
  } = useFormContext();

  const [options, setOptions] = useState([
    {
      type: "text",
      name: `option.0.${props.header}`,
      placeholder: "Opcja 1",
    },
  ]);

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

  return (
    <div className="">
      <div className="flex flex-col gap-3">
        {options.map((option) => {
          return (
            <div key={option.name} className="flex">
              <InputFields
                inputsData={[option]}
                register={register}
                //   errorMsg={(errors.inputs as any)?.[props.inputIdx]?.header}
                //   onChange={handleEditLabel}
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
