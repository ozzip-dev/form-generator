// "use client";

// import { Controller, Control, FieldValues, Path } from "react-hook-form";
// import { useMemo } from "react";
// import { OPTION_OTHER } from "@/helpers/inputHelpers";
// import InputError from "../InputError";
// import InputCheckboxOther from "./InputCheckboxOther";

// type CheckboxOption = {
//   checkboxLabel: string;
//   name: string;
//   value?: string;
//   optionId?: string;
// };

// type Props<T extends FieldValues> = {
//   groupLabel?: string;
//   groupDescription?: string;
//   required?: boolean;
//   name: Path<T>;
//   control: Control<T>;
//   options: CheckboxOption[];
//   className?: string;
//   errorMsg?: any;
//   // onChangeAction?: (
//   //   values: { name: string; value: boolean | string }[]
//   // ) => void;

//   onChangeAction?: any;
// };

// const CheckboxGroupField = <T extends FieldValues>(props: Props<T>) => {
//   const defaultValues = useMemo(
//     () =>
//       Object.fromEntries(
//         props.options.map((opt) => [opt.name, opt.value ?? ""])
//       ),
//     [props.options]
//   );

//   if (!props.options.length) return null;

//   console.log("props.options", props.options);
//   console.log("defaultValues", defaultValues);

//   // console.log("props.options", props.options);

//   return (
//     <Controller
//       name={props.name}
//       control={props.control}
//       defaultValue={defaultValues as any}
//       render={({ field, fieldState }) => {
//         console.log("field.valu", field.value);

//         const selectedValues = (field.value ?? defaultValues) as Record<
//           string,
//           string
//         >;

//         const handleToggle = (name: string) => {
//           const newValue = {
//             ...selectedValues,
//             [name]: selectedValues[name] === "" ? name : "",
//           };

//           const arrayValues = Object.entries(newValue).map(([name, val]) => ({
//             name,
//             value: val,
//           }));
//           // props.onChangeAction?.(arrayValues);
//           props.onChangeAction?.(newValue);
//           console.log("newValue", newValue);
//           // console.log("arrayValues", arrayValues);

//           field.onChange(newValue);
//         };

//         return (
//           <div className={`flex flex-col gap-2 py-5 ${props.className ?? ""}`}>
//             {props.groupLabel && (
//               <div className="text-xl">
//                 {props.groupLabel}{" "}
//                 {props.required && <span className="text-red-600">*</span>}
//               </div>
//             )}
//             {props.groupDescription && (
//               <div className="text-sm">{props.groupDescription}</div>
//             )}
//             {props.options.map(({ name, checkboxLabel, optionId = "" }) => {
//               if (optionId === OPTION_OTHER) {
//                 return (
//                   <InputCheckboxOther
//                     key={name}
//                     name={name}
//                     selectedValues={selectedValues}
//                     onChange={field.onChange}
//                   />
//                 );
//               }

//               return (
//                 <label
//                   key={name}
//                   className="flex items-center gap-3 cursor-pointer"
//                 >
//                   <div className="relative inline-block w-12 h-6">
//                     <input
//                       type="checkbox"
//                       checked={!!selectedValues[name]}
//                       onChange={() => handleToggle(name)}
//                       className="peer sr-only"
//                     />
//                     <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-full peer-checked:bg-sky-500 transition-colors" />
//                     <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
//                   </div>
//                   <span className="text-sm">{checkboxLabel}</span>
//                 </label>
//               );
//             })}
//             <InputError
//               errorMsg={
//                 fieldState.error?.message ||
//                 (props.errorMsg?.[props.name]?.message as string) ||
//                 (props.errorMsg as any)?.message
//               }
//             />
//           </div>
//         );
//       }}
//     />
//   );
// };

// export default CheckboxGroupField;

"use client";

import { Control, Controller } from "react-hook-form";
import InputError from "../InputError";
import InputCheckboxOther from "./InputCheckboxOther";
import { OPTION_OTHER } from "@/helpers/inputHelpers";
import Checkbox from "./Checkbox";

type CheckboxOption = {
  name: string;
  optionId?: string;
  checkboxLabel?: string;
};

type Props = {
  groupLabel?: string;
  groupDescription?: string;
  required?: boolean;
  name: string;
  control: Control<any>;
  options: CheckboxOption[];
  className?: string;
  errorMsg?: any;
};

export default function CheckboxGroupField(props: Props) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue={Object.fromEntries(
        props.options.map((option: any) => [option.name, ""])
      )}
      render={({ field, fieldState }) => {
        const selectedValues = field.value;

        const toggle = (name: any) => {
          const newValue = {
            ...selectedValues,
            [name]: selectedValues[name] === "" ? name : "",
          };

          field.onChange(newValue);
        };

        return (
          <div className="flex flex-col gap-3">
            {props.groupLabel && (
              <div className="text-xl">
                {props.groupLabel}
                {props.required && <span className="text-red-600">*</span>}
              </div>
            )}

            {props.groupDescription && (
              <div className="text-sm">{props.groupDescription}</div>
            )}

            {props.options.map(({ name, checkboxLabel, optionId = "" }) => {
              if (optionId === OPTION_OTHER) {
                return (
                  <InputCheckboxOther
                    key={name}
                    label={checkboxLabel}
                    name={name}
                    selectedValues={selectedValues}
                    onChange={field.onChange}
                  />
                );
              }

              return (
                <Checkbox
                  key={name}
                  checkboxLabel={checkboxLabel}
                  name={name}
                  onChange={() => toggle(name)}
                  checkedValue={selectedValues[name]}
                />
              );
            })}

            <InputError
              errorMsg={
                fieldState.error?.message ||
                (props.errorMsg?.[props.name]?.message as string) ||
                (props.errorMsg as any)?.message
              }
            />
          </div>
        );
      }}
    />
  );
}
