"use client";

import { FieldErrors, UseFormRegister, Path } from "react-hook-form";
import { DataLoader, InputError } from "../../index";
import TextareaField from "./TextareaField";
import InputField from "./InputField";

type TypeInputData = {
  staticLabel?: string;
  floatingLabel?: string;
  name: string;
  // placeholder?: string;
  type: string;
  defaultValue?: string;
  description?: string;
  required?: boolean;
  dataAttribut?: string;
};

type Props = {
  inputsData: TypeInputData[];
  // errorMsg?: FieldErrors<any> & {
  //   server?: Record<string, { message: string }>;
  // };

  errorMsg?: any;
  register?: UseFormRegister<any>;
  onChange?: (name: string, value: string, meta?: any) => void | Promise<void>;
  isLoading?: Record<string, boolean>;
  default?: Record<string, string>;
};

const InputFields = (props: Props) => {
  return (
    <div className="flex flex-col gap-8">
      {props.inputsData.map((inputData) => {
        const {
          staticLabel,
          floatingLabel,
          required,
          description,
          name,
          type,
        } = inputData;

        return (
          <div key={name} className="relative">
            {description && <div className="text-sm">{description}</div>}

            {staticLabel && (
              <label htmlFor={name} className="block text-sm font-bold mb-1">
                {staticLabel}
              </label>
            )}

            {type === "textarea" ? (
              <TextareaField
                inputData={inputData}
                register={props.register}
                onChange={props.onChange}
                isLoading={props.isLoading}
                default={props.default}
              />
            ) : (
              <InputField
                inputData={inputData}
                register={props.register}
                onChange={props.onChange}
                isLoading={props.isLoading}
                default={props.default}
              />
            )}

            {floatingLabel && (
              <label
                htmlFor={name}
                className={`
                bg-white px-1
                pointer-events-none absolute left-3
                origin-left transition-all duration-200

                // empty not focus
                peer-placeholder-shown:top-3
                peer-placeholder-shown:text-base

                // focus - label up 
                peer-focus:-top-3
                peer-focus:text-xs
                peer-focus:text-accent

                // not focus - label up
                -top-3 text-xs 
            `}
              >
                {floatingLabel}
                {required && <span className="text-red ml-0.5">*</span>}
              </label>
            )}
            <InputError
              errorMsg={
                (props.errorMsg?.[name]?.message as string) ||
                (props.errorMsg as any)?.message ||
                (props.errorMsg?.[name] && props.errorMsg?.[name][0])
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default InputFields;

// "use client";

// import { FieldErrors, UseFormRegister, Path } from "react-hook-form";
// import { DataLoader, InputError } from "../index";

// type Props = {
//   inputsData: {
//     label?: string;
//     name: string;
//     placeholder?: string;
//     type: string;
//     defaultValue?: string;
//     description?: string;
//     required?: boolean;
//   }[];
//   // errorMsg?: FieldErrors<any> & {
//   //   server?: Record<string, { message: string }>;
//   // };

//   errorMsg?: any;
//   register?: UseFormRegister<any>;
//   // onChange?: (name: string, value: string) => void | Promise<void>;
//   onChange?: any;
//   isLoading?: Record<string, boolean>;
// };

// const InputFields = (props: Props) => {
//   return (
//     <>
//       {props.inputsData.map(
//         ({
//           label,
//           name,
//           placeholder,
//           type,
//           defaultValue,
//           description,
//           required,
//         }) => {
//           return (
//             // TODO: make a separate component for input field
//             <div key={name}>
//               {label && (
//                 <label className="text-lg block text-xl !important">
//                   {label} {required && <span className="text-red-600">*</span>}
//                 </label>
//               )}

//               {description && <div className="text-sm">{description}</div>}
//               <div className="flex">
//                 <input
//                   type={type}
//                   defaultValue={defaultValue ? defaultValue : ""}
//                   disabled={props.isLoading?.[name]}
//                   className={`w-full border-b-2 border-gray-300 focus:border-accent focus:outline-none px-2 py-1
//                     ${
//                       props.isLoading?.[name]
//                         ? "opacity-50 cursor-not-allowed"
//                         : ""
//                     }
//                   `}
//                   placeholder={placeholder}
//                   // {...(props.register
//                   //   ? props.register(name, {
//                   //       onChange: (e) => props.onChange?.(name, e.target.value),
//                   //     })
//                   //   : {})}

//                   onChange={(e) => props.onChange?.(name, e.target.value)}
//                   name={name}
//                 />

//                 {props.isLoading?.[name] && <DataLoader size="sm" />}
//               </div>

//               <InputError
//                 errorMsg={
//                   (props.errorMsg?.[name]?.message as string) ||
//                   (props.errorMsg as any)?.message
//                 }
//               />

//               <div className="text-red-500">
//                 {props.errorMsg?.[name] && props.errorMsg?.[name][0]}
//               </div>
//             </div>
//           );
//         }
//       )}
//     </>
//   );
// };

// export default InputFields;

// "use client";

// import { FieldErrors, UseFormRegister, Path } from "react-hook-form";
// import { DataLoader, InputError } from "../index";

// type Props = {
//   inputsData: {
//     label?: string;
//     name: string;
//     placeholder?: string;
//     type: string;
//     defaultValue?: string;
//     description?: string;
//     required?: boolean;
//   }[];
//   errorMsg?: FieldErrors<any> & {
//     server?: Record<string, { message: string }>;
//   };
//   register?: UseFormRegister<any>;
//   onChange?: (name: string, value: string) => void | Promise<void>;
//   isLoading?: Record<string, boolean>;
// };

// const InputFields = (props: Props) => {
//   return (
//     <>
//       {props.inputsData.map(
//         ({
//           label,
//           name,
//           placeholder,
//           type,
//           defaultValue,
//           description,
//           required,
//         }) => {
//           return (
//             // TODO: make a separate component for input field
//             <div key={name}>
//               {label && (
//                 <label className="text-lg block text-xl !important">
//                   {label} {required && <span className="text-red-600">*</span>}
//                 </label>
//               )}

//               {description && <div className="text-sm">{description}</div>}
//               <div className="flex">
//                 <input
//                   type={type}
//                   defaultValue={defaultValue ? defaultValue : ""}
//                   disabled={props.isLoading?.[name]}
//                   className={`w-full border-b-2 border-gray-300 focus:border-accent focus:outline-none px-2 py-1
//                     ${
//                       props.isLoading?.[name]
//                         ? "opacity-50 cursor-not-allowed"
//                         : ""
//                     }
//                   `}
//                   placeholder={placeholder}
//                   {...(props.register
//                     ? props.register(name, {
//                         onChange: (e) => props.onChange?.(name, e.target.value),
//                       })
//                     : {})}
//                 />

//                 {props.isLoading?.[name] && <DataLoader size="sm" />}
//               </div>

//               <InputError
//                 errorMsg={
//                   (props.errorMsg?.[name]?.message as string) ||
//                   (props.errorMsg as any)?.message
//                 }
//               />
//             </div>
//           );
//         }
//       )}
//     </>
//   );
// };

// export default InputFields;

// "use client";

// import { FieldErrors, UseFormRegister, Path } from "react-hook-form";
// import { DataLoader, InputError } from "../index";

// type Props = {
//   inputsData: {
//     label?: string;
//     name: string;
//     placeholder?: string;
//     type: string;
//     defaultValue?: string;
//     description?: string;
//     required?: boolean;
//   }[];
//   // errorMsg?: FieldErrors<any> & {
//   //   server?: Record<string, { message: string }>;
//   // };

//   errorMsg?: any;
//   register?: UseFormRegister<any>;
//   // onChange?: (name: string, value: string) => void | Promise<void>;
//   onChange?: any;
//   isLoading?: Record<string, boolean>;
//   default?: any;
//   values?: any;
// };

// const InputFields = (props: Props) => {
//   console.log("errprops.props.inputsData", props.inputsData);

//   return (
//     <>
//       {props.inputsData?.map(
//         ({
//           label,
//           name,
//           placeholder,
//           type,
//           defaultValue,
//           description,
//           required,
//         }) => {
//           return (
//             // TODO: make a separate component for input field
//             <div key={name}>
//               {label && (
//                 <label className="text-lg block text-xl !important">
//                   {label} {required && <span className="text-red-600">*</span>}
//                 </label>
//               )}

//               {description && <div className="text-sm">{description}</div>}
//               <div className="flex">
//                 <input
//                   type={type}
//                   // defaultValue={defaultValue ? defaultValue : ""}
//                   defaultValue={props.default[name] ? props.default[name] : ""}
//                   // value={props.values[name] ?? ""}
//                   disabled={props.isLoading?.[name]}
//                   className={`w-full border-b-2 border-gray-300 focus:border-accent focus:outline-none px-2 py-1
//                     ${
//                       props.isLoading?.[name]
//                         ? "opacity-50 cursor-not-allowed"
//                         : ""
//                     }
//                   `}
//                   placeholder={placeholder}
//                   // {...(props.register
//                   //   ? props.register(name, {
//                   //       onChange: (e) => props.onChange?.(name, e.target.value),
//                   //     })
//                   //   : {})}

//                   // onChange={(e) => props.onChange?.(name, e.target.value)}
//                   name={name}
//                 />

//                 {props.isLoading?.[name] && <DataLoader size="sm" />}
//               </div>

//               {/* <InputError
//                 errorMsg={
//                   (props.errorMsg?.[name]?.message as string) ||
//                   (props.errorMsg as any)?.message
//                 }
//               /> */}

//               <div className="text-red-500">
//                 {props.errorMsg?.[name] && props.errorMsg?.[name][0]}
//               </div>
//             </div>
//           );
//         }
//       )}
//     </>
//   );
// };

// "use client";

// import { FieldErrors, UseFormRegister, Path } from "react-hook-form";
// import { DataLoader, InputError } from "../index";

// type Props = {
//   inputsData: {
//     label?: string;
//     name: string;
//     placeholder?: string;
//     type: string;
//     defaultValue?: string;
//     description?: string;
//     required?: boolean;
//   }[];
//   // errorMsg?: FieldErrors<any> & {
//   //   server?: Record<string, { message: string }>;
//   // };

//   errorMsg?: any;
//   register?: UseFormRegister<any>;
//   // onChange?: (name: string, value: string) => void | Promise<void>;
//   onChange?: any;
//   isLoading?: Record<string, boolean>;
//   default?: any;
// };

// const InputFields = (props: Props) => {
//   return (
//     <>
//       {props.inputsData.map(
//         ({
//           label,
//           name,
//           placeholder,
//           type,
//           defaultValue,
//           description,
//           required,
//         }) => {
//           return (
//             // TODO: make a separate component for input field
//             <div key={name}>
//               {label && (
//                 <label className="text-lg block text-xl !important">
//                   {label} {required && <span className="text-red-600">*</span>}
//                 </label>
//               )}

//               {description && <div className="text-sm">{description}</div>}
//               <div className="flex">
//                 <input
//                   type={type}
//                   defaultValue={props.default ? props.default[name] : ""}
//                   disabled={props.isLoading?.[name]}
//                   className={`w-full border-b-2 border-gray-300 focus:border-accent focus:outline-none px-2 py-1
//                     ${
//                       props.isLoading?.[name]
//                         ? "opacity-50 cursor-not-allowed"
//                         : ""
//                     }
//                   `}
//                   placeholder={placeholder}
//                   {...(props.register
//                     ? props.register(name, {
//                         onChange: (e) => props.onChange?.(name, e.target.value),
//                       })
//                     : {})}
//                   onChange={(e) => props.onChange?.(name, e.target.value)}
//                   name={name}
//                 />

//                 {props.isLoading?.[name] && <DataLoader size="sm" />}
//               </div>

//               <InputError
//                 errorMsg={
//                   (props.errorMsg?.[name]?.message as string) ||
//                   (props.errorMsg as any)?.message
//                 }
//               />

//               <div className="text-red-500">
//                 {props.errorMsg?.[name] && props.errorMsg?.[name][0]}
//               </div>
//             </div>
//           );
//         }
//       )}
//     </>
//   );
// };

// export default InputFields;

// import React from "react";

// import TextareaField from "./TextareaField";

// type InputData = {
//   label: string;
//   name: string;
//   type: string;
//   placeholder?: string;
// };

// type PropsAA = {
//   inputsData: InputData[];
//   values?: Record<string, string>;
//   errorMsg?: Record<string, string[]>;
//   onChange?: (name: string, value: string) => void;
// };

// export const InputFieldsAA: React.FC<PropsAA> = ({
//   inputsData,
//   values = {},
//   errorMsg = {},
//   onChange,
// }) => {
//   return (
//     <>
//       {inputsData.map((input) => (
//         <div key={input.name} className="flex flex-col mb-2">
//           <label className="mb-1 font-semibold">{input.label}</label>
//           <input
//             type={input.type}
//             name={input.name}
//             placeholder={input.placeholder}
//             value={values[input.name] || ""}
//             onChange={(e) => onChange?.(input.name, e.target.value)}
//             className="border rounded p-2"
//           />
//           {errorMsg[input.name]?.length > 0 && (
//             <p className="text-red-600 text-sm mt-1">
//               {errorMsg[input.name].join(", ")}
//             </p>
//           )}
//         </div>
//       ))}
//     </>
//   );
// };
