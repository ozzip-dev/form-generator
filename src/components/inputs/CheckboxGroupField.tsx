// "use client";

// import { useMemo } from "react";
// import { useController, Control, FieldValues, Path } from "react-hook-form";

// type CheckboxOption = {
//   label: string;
//   name: string;
//   value: boolean;
// };

// type Props<T extends FieldValues> = {
//   label?: string;
//   description?: string;
//   required?: string;
//   name: Path<T>;
//   control?: Control<T>;
//   options: CheckboxOption[];
//   className?: string;
//   onChangeAction?: (values: { name: string; value: boolean }[]) => void;
// };

// export const CheckboxField = <T extends FieldValues>(props: Props<T>) => {
//   const {
//     field: { value = {}, onChange },
//   } = useController({
//     name: props.name,
//     control: props.control,
//   });

//   const defaultValues = useMemo(
//     () =>
//       Object.fromEntries(
//         props.options.map((opt) => [opt.name, opt.value ?? false])
//       ),
//     [props.options]
//   );

//   const selectedValues = value ?? defaultValues;

//   const handleToggle = (name: string) => {
//     const newValue = {
//       ...selectedValues,
//       [name]: !selectedValues[name],
//     };

//     const arrayValues = Object.entries(newValue).map(([name, val]) => ({
//       name,
//       value: val,
//     }));

//     props.onChangeAction?.(arrayValues);
//     onChange(newValue);
//   };

//   return (
//     <div className={`flex flex-col gap-2 ${props.className ?? ""}`}>
//       <div className="text-xl">{props.label}</div>
//       {props.description && (
//         <div className="text-sm">
//           {props.description}{" "}
//           {props.required && <span className="text-red-600">*</span>}
//         </div>
//       )}
//       {props.options.map((option) => (
//         <label
//           key={option.name}
//           className="flex items-center gap-3 cursor-pointer"
//         >
//           <div className="relative inline-block w-12 h-6">
//             <input
//               type="checkbox"
//               checked={selectedValues[option.name] ?? option.value}
//               onChange={() => handleToggle(option.name)}
//               className="peer sr-only"
//             />
//             <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-full peer-checked:bg-sky-500 transition-colors" />
//             <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
//           </div>
//           <span className="text-sm">{option.label}</span>
//         </label>
//       ))}
//     </div>
//   );
// };

// "use client";

// import { useController, Control, FieldValues, Path } from "react-hook-form";
// import { useMemo } from "react";

// type CheckboxOption = {
//   label: string;
//   name: string;
//   value: boolean;
// };

// type Props<T extends FieldValues> = {
//   label?: string;
//   description?: string;
//   required?: string;
//   name: Path<T>;
//   control?: Control<T>;
//   options: CheckboxOption[];
//   className?: string;
//   onChangeAction?: (values: { name: string; value: boolean }[]) => void;
// };

// export const CheckboxField = <T extends FieldValues>(props: Props<T>) => {
//   const {
//     field: { value, onChange },
//   } = useController({
//     name: props.name,
//     control: props.control,
//   });

//   // 👇 Domyślny obiekt z wszystkimi opcjami ustawionymi na false
//   const defaultValues = useMemo(
//     () =>
//       Object.fromEntries(
//         props.options.map((opt) => [opt.name, opt.value ?? false])
//       ),
//     [props.options]
//   );

//   const selectedValues = value ?? defaultValues;

//   const handleToggle = (name: string) => {
//     const newValue = {
//       ...selectedValues,
//       [name]: !selectedValues[name],
//     };

//     const arrayValues = Object.entries(newValue).map(([name, val]) => ({
//       name,
//       value: val,
//     }));

//     props.onChangeAction?.(arrayValues);
//     onChange(newValue);
//   };

//   return (
//     <div className={`flex flex-col gap-2 ${props.className ?? ""}`}>
//       <div className="text-xl">{props.label}</div>
//       {props.description && (
//         <div className="text-sm">
//           {props.description}{" "}
//           {props.required && <span className="text-red-600">*</span>}
//         </div>
//       )}
//       {props.options.map((option) => (
//         <label
//           key={option.name}
//           className="flex items-center gap-3 cursor-pointer"
//         >
//           <div className="relative inline-block w-12 h-6">
//             <input
//               type="checkbox"
//               checked={selectedValues[option.name] ?? false}
//               onChange={() => handleToggle(option.name)}
//               className="peer sr-only"
//             />
//             <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-full peer-checked:bg-sky-500 transition-colors" />
//             <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
//           </div>
//           <span className="text-sm">{option.label}</span>
//         </label>
//       ))}
//     </div>
//   );
// };

"use client";

import { useController, Control, FieldValues, Path } from "react-hook-form";
import { useMemo, useEffect } from "react";

type CheckboxOption = {
  label: string;
  name: string;
  value?: boolean;
};

type Props<T extends FieldValues> = {
  label?: string;
  description?: string;
  required?: string;
  name: Path<T>;
  control: Control<T>;
  options: CheckboxOption[];
  className?: string;
  onChangeAction?: (values: { name: string; value: boolean }[]) => void;
};

export const CheckboxGroupField = <T extends FieldValues>(props: Props<T>) => {
  const defaultValues = useMemo(
    () =>
      Object.fromEntries(
        props.options.map((opt) => [opt.name, opt.value ?? false])
      ),
    [props.options]
  );

  const {
    field: { value = defaultValues, onChange },
  } = useController({
    name: props.name,
    control: props.control,
  });

  useEffect(() => {
    onChange(defaultValues);
  }, [onChange]);

  const selectedValues = value ?? defaultValues;

  const handleToggle = (name: string) => {
    const newValue = {
      ...selectedValues,
      [name]: !selectedValues[name],
    };

    const arrayValues = Object.entries(newValue).map(([name, val]) => ({
      name,
      value: val,
    }));

    props.onChangeAction?.(arrayValues);
    onChange(newValue);
  };

  return (
    <div className={`flex flex-col gap-2 ${props.className ?? ""}`}>
      {props.label && (
        <div className="text-xl">
          {props.label}{" "}
          {props.required && <span className="text-red-600">*</span>}
        </div>
      )}
      {props.description && <div className="text-sm">{props.description} </div>}
      {props.options.map((option) => (
        <label
          key={option.name}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="relative inline-block w-12 h-6">
            <input
              type="checkbox"
              checked={selectedValues[option.name] ?? false}
              onChange={() => handleToggle(option.name)}
              className="peer sr-only"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-full peer-checked:bg-sky-500 transition-colors" />
            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
          </div>
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </div>
  );
};
