// import { useFormContext } from "react-hook-form";
// import { useEffect, useState } from "react";
// import IconTrash from "@/icons/iconTrash/IconTrash";
// import { useEditForm } from "@/hooks/useEditForm";
// import { useSafeURLParam } from "@/hooks/useSafeURLParam";
// import { FullscreenLoader, Button, InputFields } from "@/components/shared";
// import RemoveInputOptionAction from "@/actions/edit-form/RemoveInputOptionAction";
// import { FormInput } from "@/types/input";
// import editInputOptionAction from "@/actions/edit-form/editInput/editInputOptionAction";

// type Props = {
//   header: string;
//   inputId: string;
// };

// const AddOption = (props: Props) => {
//   const formId = useSafeURLParam("formId");
//   const {
//     register,
//     formState: { errors },
//     trigger,
//     control,
//     setError,
//     watch,
//   } = useFormContext();

//   const [options, setOptions] = useState([
//     {
//       type: "text",
//       name: `option.0.${props.header}`,
//       placeholder: "Opcja 1",
//       defaultValue: "",
//     },
//   ]);

//   const { handleEdit, isLoading } = useEditForm({
//     formId,
//     inputId: props.inputId,
//     trigger,
//     action: editInputOptionAction,
//     mode: "inputOption",
//   });

//   // useEffect(() => {
//   //   const subscription = watch((values) => {
//   //     if (!values) return;
//   //     const inputWithId: FormInput = values.inputs.find(
//   //       ({ id }: { id: string }) => id == props.inputId
//   //     );
//   //     if (!inputWithId) return;
//   //     setOptions(
//   //       inputWithId.options?.map((item, index) => ({
//   //         type: "text",
//   //         name: `option.${index}.${props.header}`,
//   //         placeholder: `Opcja ${index + 1}`,
//   //         defaultValue: item,
//   //       }))
//   //     );
//   //   });
//   //   return () => subscription.unsubscribe();
//   // }, [watch, props.header, props.inputId]);

//   const handleAddOption = () => {
//     const nextIndex = options?.length;
//     console.log("options", options);

//     setOptions([
//       ...options,
//       {
//         type: "text",
//         name: `option.${nextIndex}.${props.header}`,
//         placeholder: `Opcja ${nextIndex + 1}`,
//         defaultValue: "",
//       },
//     ]);
//   };

//   const handleDeleteOption = (optionName: string) => {
//     setOptions((prev) => {
//       const filtered = prev.filter((item) => item.name !== optionName);
//       return filtered.map((item, index) => ({
//         ...item,
//         name: `option.${index}.${props.header}`,
//         placeholder: `Opcja ${index + 1}`,
//       }));
//     });
//     RemoveInputOptionAction(formId!, props.inputId, optionName);
//   };

//   const onOptionChange = (name: string, value: string) => {
//     setOptions(
//       options?.map((item) => {
//         if (item.name != name) return item;
//         return {
//           ...item,
//           defaultValue: value,
//         };
//       })
//     );
//     handleEdit(name, value);
//   };

//   const isAnyLoading = [...Object.values(isLoading ?? {})].some(Boolean);
//   return (
//     <div className="ml-8  pt-4 border-t-2 border-zinc-400">
//       <div className="flex flex-col gap-2">
//         {options?.map((option, i) => {
//           return (
//             <div key={i} className="flex">
//               {isAnyLoading && <FullscreenLoader />}
//               <InputFields
//                 inputsData={[option]}
//                 register={register}
//                 //   errorMsg={(errors.inputs as any)?.[props.inputIdx]?.header}
//                 onChange={onOptionChange}
//               />
//               {/* <input
//                 type="text"
//                 value={option.defaultValue}
//                 placeholder={option.placeholder}
//                 onChange={(e) => onOptionChange(option.name, e.target.value)}
//               /> */}
//               <div className="w-fit ml-2">
//                 <Button
//                   type="button"
//                   icon={<IconTrash style="h-5 w-5 bg-white" />}
//                   onClickAction={() => handleDeleteOption(option.name)}
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="w-fit">
//         <Button
//           message="Dodaj opcję do wyboru"
//           type="button"
//           onClickAction={handleAddOption}
//         />
//       </div>
//     </div>
//   );
// };

// export default AddOption;

import { useFieldArray, useFormContext } from "react-hook-form";
import IconTrash from "@/icons/iconTrash/IconTrash";
import { Button, FullscreenLoader, InputFields } from "@/components/shared";
import { useEditForm } from "@/hooks/useEditForm";
import editInputOptionAction from "@/actions/edit-form/editInput/editInputOptionAction";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";

type Props = {
  inputIdx: number;
  inputId: string;
  header: string;
};

const AddOption = (props: Props) => {
  const { register, control, trigger } = useFormContext();
  const formId = useSafeURLParam("formId");
  const { fields, append, remove } = useFieldArray({
    control,
    name: `inputs.${props.inputIdx}.options`,
  });

  const { handleEdit, isLoading } = useEditForm({
    formId,
    inputId: props.inputId,
    trigger,
    action: editInputOptionAction,
    mode: "inputOption",
  });

  const isAnyLoading = [...Object.values(isLoading ?? {})].some(Boolean);

  return (
    <div className="ml-8 pt-4 border-t-2 border-zinc-400">
      {isAnyLoading && <FullscreenLoader />}
      {fields.map((field, idx) => (
        <div key={field.id} className="flex gap-2 items-center">
          <InputFields
            inputsData={[
              {
                type: "text",
                name: `inputs.${props.inputIdx}.options.${idx}`,
                placeholder: `Opcja ${idx + 1}`,
              },
            ]}
            register={register}
            //   errorMsg={(errors.inputs as any)?.[props.inputIdx]?.header}

            onChange={(_, value) =>
              handleEdit(`option.${idx}.${props.header}`, value)
            }
          />

          <div className="w-fit ml-2">
            <Button
              type="button"
              icon={<IconTrash style="h-5 w-5 bg-white" />}
              onClickAction={() => remove(idx)}
              // onClickAction={() => handleDeleteOption(option.name)}
            />
          </div>
        </div>
      ))}

      <Button
        message="Dodaj opcję"
        type="button"
        onClickAction={() => append("")}
      />
    </div>
  );
};

export default AddOption;
