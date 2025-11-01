import { useFormContext } from "react-hook-form";
import InputFields from "../inputs/InputFields";
import Button from "../ui/buttons/Button";
import { az } from "zod/v4/locales";
import { useEffect, useState } from "react";
import IconTrash from "@/icons/iconTrash/IconTrash";
import { watch } from "fs";

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
    watch,
  } = useFormContext();

  const [options, setOptions] = useState([
    {
      type: "text",
      name: `option.0.${props.header}`,
      placeholder: "Opcja 1",
    },
  ]);

  useEffect(() => {
    const subscription = watch((values) => {
      // console.log("Aktualne wartości:", values);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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

  const handleEditOption = () => {
    console.log("yyy");
  };

  return (
    <div className="ml-8  pt-4 border-t-2 border-zinc-400">
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          return (
            <div key={option.name} className="flex">
              <InputFields
                inputsData={[option]}
                register={register}
                //   errorMsg={(errors.inputs as any)?.[props.inputIdx]?.header}
                onChange={handleEditOption}
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

// "use client";

// import { useFormContext, useFieldArray } from "react-hook-form";
// import InputFields from "../inputs/InputFields";
// import Button from "../ui/buttons/Button";
// import IconTrash from "@/icons/iconTrash/IconTrash";

// type Props = {
//   header: string;
// };

// const AddOption = ({ header }: Props) => {
//   const { control, register } = useFormContext();

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: `option.${header}`, // np. option.myHeader
//   });

//   const handleAddOption = () => {
//     append({ value: "" });
//   };

//   return (
//     <div className="flex flex-col gap-3">
//       {fields.map((field, index) => (
//         <div key={field.id} className="flex items-center">
//           <input
//             {...register(`option.${header}.${index}.value`)}
//             placeholder={`Opcja ${index + 1}`}
//             className="border rounded-lg px-3 py-2 w-full"
//             type="text"
//           />
//           <Button
//             type="button"
//             icon={<IconTrash style="h-5 w-5 bg-white" />}
//             onClickAction={() => remove(index)}
//             className="ml-2"
//           />
//         </div>
//       ))}

//       <div className="w-fit mt-3">
//         <Button
//           message="Dodaj opcję"
//           type="button"
//           onClickAction={handleAddOption}
//         />
//       </div>
//     </div>
//   );
// };

// export default AddOption;
