// "use client";

// import { useFormContext } from "react-hook-form";
// import React, { useEffect, useState } from "react";
// import InputError from "./InputError";
// import { isOptionOther, OPTION_OTHER } from "@/helpers/inputHelpers";
// import OtherOptionInput from "./selectField/OtherOptionInput";

// type Option = {
//   label: string;
//   value: string;
// };

// type Props = {
//   name: string;
//   value?: string;
//   label?: string;
//   description?: string;
//   required?: boolean;
//   options: Option[];
//   className?: string;
//   optionClass?: string;
//   errorMsg?: any;
// };

// const RadioGroupField = (props: Props) => {
//   const {
//     register,
//     watch,
//     formState: { errors },
//     setValue,
//   } = useFormContext();
//   // TODO: jakos prosciej
//   const [optionClicked, setOptionClicked] = useState<string>("");

//   const selected = watch(props.name);
//   const errorMsg = (errors[props.name]?.message as string) || "";

//   return (
//     <div className="flex flex-col py-5">
//       {props.label && (
//         <label className="text-xl">
//           {props.label}{" "}
//           {props.required && <span className="text-red-600">*</span>}
//         </label>
//       )}
//       {props.description && <div className="text-sm">{props.description} </div>}

//       <div className={props.className}>
//         {props.options.map((option) => {
//           const isOtherSelected = optionClicked == OPTION_OTHER;
//           const isChecked = isOptionOther(option)
//             ? optionClicked == OPTION_OTHER
//             : selected === option.label;

//           return (
//             <div key={option.value} className="flex gap-4 items-center">
//               <label className={props.optionClass} data-checked={isChecked}>
//                 <input
//                   {...register(props.name)}
//                   type="radio"
//                   value={option.label}
//                   className="hidden"
//                   onClick={() => setOptionClicked(option.value)}
//                 />
//                 <span>{option.label}</span>
//               </label>

//               {option.value === "other" && (
//                 <OtherOptionInput
//                   name={props.name}
//                   setValue={setValue}
//                   disabled={!isOtherSelected}
//                 />
//               )}
//             </div>
//           );
//         })}
//       </div>

//       <InputError
//         errorMsg={
//           (props.errorMsg?.[props.name]?.message as string) ||
//           (props.errorMsg as any)?.message
//         }
//       />
//     </div>
//   );
// };

// export default RadioGroupField;

// "use client";

// import { useFormContext } from "react-hook-form";
// import React, { useEffect, useState } from "react";
// import InputError from "./InputError";
// import { isOptionOther, OPTION_OTHER } from "@/helpers/inputHelpers";
// import OtherOptionInput from "./selectField/OtherOptionInput";

// type Option = {
//   label: string;
//   value: string;
// };

// type Props = {
//   name: string;
//   value?: string;
//   label?: string;
//   description?: string;
//   required?: boolean;
//   options: Option[];
//   className?: string;
//   optionClass?: string;
//   errorMsg?: any;
// };

// const RadioGroupField = (props: Props) => {
//   const {
//     register,
//     watch,
//     formState: { errors },
//     setValue,
//   } = useFormContext();
//   const value = watch(props.name);
//   // TODO: jakos prosciej
//   const [optionClicked, setOptionClicked] = useState<string>("");

//   const selected = watch(props.name);
//   const errorMsg = (errors[props.name]?.message as string) || "";

//   return (
//     <div className="flex flex-col py-5">
//       {props.label && (
//         <label className="text-xl">
//           {props.label}{" "}
//           {props.required && <span className="text-red-600">*</span>}
//         </label>
//       )}
//       {props.description && <div className="text-sm">{props.description} </div>}

//       <div className={props.className}>
//         {props.options.map((option) => {
//           const isOtherSelected = optionClicked == OPTION_OTHER;
//           const isChecked = isOptionOther(option)
//             ? optionClicked == OPTION_OTHER
//             : selected === option.label;

//           console.log("isChecked", isChecked);

//           return (
//             <div key={option.value} className="flex gap-4 items-center">
//               {option.value === "other" ? (
//                 <>
//                   {" "}
//                   <label>{option.label}</label>
//                   <input
//                     type="text"
//                     value={isChecked ? "" : selected}
//                     placeholder="Inna odpowiedź"
//                     onChange={(e) => {
//                       // ✅ pisanie w text → czyści radio
//                       setValue(props.name, e.target.value, {
//                         shouldDirty: true,
//                         shouldValidate: true,
//                       });
//                     }}
//                   />
//                 </>
//               ) : (
//                 <label className={props.optionClass} data-checked={isChecked}>
//                   <input
//                     {...register(props.name)}
//                     type="radio"
//                     value={option.label}
//                     className="hidden"
//                     // onClick={() => setOptionClicked(option.value)}
//                     onChange={() => {
//                       // ✅ klik w radio → czyści text
//                       setValue(props.name, option.label, {
//                         shouldDirty: true,
//                         shouldValidate: true,
//                       });
//                     }}
//                   />
//                   <span>{option.label}</span>
//                 </label>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       <InputError
//         errorMsg={
//           (props.errorMsg?.[props.name]?.message as string) ||
//           (props.errorMsg as any)?.message
//         }
//       />
//     </div>
//   );
// };

// export default RadioGroupField;

"use client";

import { useFormContext } from "react-hook-form";
import InputError from "./InputError";
import { OPTION_OTHER } from "@/helpers/inputHelpers";

type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  options: Option[];
  className?: string;
  optionClass?: string;
  errorMsg?: any;
};

const RadioGroupField = (props: Props) => {
  const {
    register,
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
    <div className="flex flex-col py-5">
      {props.label && (
        <label className="text-xl">
          {props.label}
          {props.required && <span className="text-red-600">*</span>}
        </label>
      )}

      {props.description && <div className="text-sm">{props.description}</div>}

      <div className={props.className}>
        {props.options.map((option) => {
          const isOther = option.value === OPTION_OTHER;
          const isChecked = !isOther && value === option.label;

          return (
            <div key={option.value} className="flex gap-4 items-center">
              {isOther ? (
                <input
                  type="text"
                  value={isRadioValue ? "" : value || ""}
                  placeholder="Inna odpowiedź"
                  onChange={(e) => {
                    setValue(props.name, e.target.value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                  className="border px-2 py-1"
                />
              ) : (
                <label className={props.optionClass} data-checked={isChecked}>
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
                  <span>{option.label}</span>
                </label>
              )}
            </div>
          );
        })}
      </div>

      <InputError
        errorMsg={
          props.errorMsg?.[props.name]?.message ||
          (props.errorMsg as any)?.message ||
          errorMsg
        }
      />
    </div>
  );
};

export default RadioGroupField;
