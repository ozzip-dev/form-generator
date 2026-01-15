// "use client";

// import { OPTION_OTHER } from "@/helpers/inputHelpers";
// import { useFormContext } from "react-hook-form";
// import InputError from "../InputError";
// import InputRadioOther from "./InputRadioOther";
// import InputDescription from "../InputDescription";
// import InputIndicators from "../InputIndicators";

// type Option = {
//   label: string;
//   value: string;
// };

// type Props = {
//   name: string;
//   label?: string;
//   description?: string;
//   required?: boolean;
//   unique?: boolean;
//   options: Option[];
//   className?: string;
//   optionClass?: string;
//   errorMsg?: any;
// };

// const RadioGroupField = (props: Props) => {
//   const {
//     watch,
//     setValue,
//     formState: { errors },
//   } = useFormContext();

//   const value = watch(props.name);
//   const errorMsg = (errors[props.name]?.message as string) || "";

//   const radioLabels = props.options
//     .filter((o) => o.value !== OPTION_OTHER)
//     .map((o) => o.label);

//   const isRadioValue = radioLabels.includes(value);

//   return (
//     <div className="flex flex-col py-5  text-sm">
//       {props.label && (
//         <label className="font-bold">
//           {props.label}
//           <InputIndicators required={props.required} unique={props.unique} />
//         </label>
//       )}

//       {props.description && (
//         <InputDescription description={props.description} />
//       )}

//       <div className={`relative ${props.className}`}>
//         {props.options.map((option) => {
//           const isOther = option.value === OPTION_OTHER;
//           const isChecked = !isOther && value === option.label;

//           return (
//             <div key={option.value} className="flex gap-4 items-center">
//               {isOther ? (
//                 <InputRadioOther
//                   label={option.label}
//                   name={props.name}
//                   setValue={setValue}
//                   isRadioValue={isRadioValue}
//                   value={value}
//                 />
//               ) : (
//                 <label className="flex items-center gap-3 cursor-pointer mb-1">
//                   <input
//                     type="radio"
//                     className="sr-only peer"
//                     checked={isChecked}
//                     onChange={() => {
//                       setValue(props.name, option.label, {
//                         shouldDirty: true,
//                         shouldValidate: true,
//                       });
//                     }}
//                   />

//                   {/* OUTER */}
//                   <span
//                     className="
//                     group
//                     w-5 h-5 rounded-full border
//                     flex items-center justify-center
//                     transition
//                     peer-checked:border-accent
//                   "
//                   >
//                     {/* INNER */}
//                     <span
//                       className="
//                       w-3 h-3 rounded-full bg-accent
//                       scale-0
//                       transition-transform
//                       group-[.peer:checked]:scale-100
//                     "
//                     />
//                   </span>

//                   <span>{option.label}</span>
//                 </label>
//               )}
//             </div>
//           );
//         })}

//         <InputError
//           errorMsg={
//             props.errorMsg?.[props.name]?.message ||
//             (props.errorMsg as any)?.message ||
//             errorMsg
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export default RadioGroupField;

"use client";

import { OPTION_OTHER } from "@/helpers/inputHelpers";
import { useFormContext } from "react-hook-form";
import InputError from "../InputError";
import InputRadioOther from "./InputRadioOther";
import InputDescription from "../FormDescription";

type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  unique?: boolean;
  options: Option[];
  className?: string;
  optionClass?: string;
  errorMsg?: any;
};

const RadioGroupField = (props: Props) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const value = watch(props.name);
  const errorMsg = (errors[props.name]?.message as string) || "";

  const radioLabels = props.options
    .filter((o) => o.value !== OPTION_OTHER)
    .map((o) => o.label);

  const isRadioValue = radioLabels.includes(value);

  return (
    <div className="flex flex-col py-5  text-sm">
      {props.label && (
        <label className="font-bold mb-3">
          {props.label}
          {props.required && <span className="text-red-600">*</span>}
        </label>
      )}

      {props.description && (
        <InputDescription description={props.description} />
      )}

      <div className={`relative ${props.className}`}>
        {props.options.map((option) => {
          const isOther = option.value === OPTION_OTHER;
          const isChecked = !isOther && value === option.label;

          return (
            <div key={option.value} className="flex gap-4 items-center">
              {isOther ? (
                <InputRadioOther
                  label={option.label}
                  name={props.name}
                  setValue={setValue}
                  isRadioValue={isRadioValue}
                  value={value}
                />
              ) : (
                <label
                  data-checked={isChecked}
                  className="relative w-8 h-8 mb-3
                            border rounded-full
                            py-2 cursor-pointer hover:bg-gray-100 
                            data-[checked=true]:bg-accent 
                            data-[checked=true]:border-accent 
                            data-[checked=true]:shadow-[inset_0_0_0_2px_white]
                            "
                >
                  <input
                    type="radio"
                    value={option.label}
                    checked={isChecked}
                    className="hidden"
                    onChange={() => {
                      setValue(props.name, option.label, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }}
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 left-12">
                    {option.label}
                  </span>
                </label>
              )}
            </div>
          );
        })}

        <InputError
          errorMsg={
            props.errorMsg?.[props.name]?.message ||
            (props.errorMsg as any)?.message ||
            errorMsg
          }
        />
      </div>
    </div>
  );
};

export default RadioGroupField;
