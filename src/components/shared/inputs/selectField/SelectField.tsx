"use client";

import { useState, useRef, useEffect } from "react";
import IconArrowDown from "@/icons/iconArrowDown/IconArrowDown";
import InputError from "../InputError";
import { useFormContext } from "react-hook-form";

export type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type Props = {
  name: string;
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void | Promise<void>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  errorMsg?: string;
  className?: string;
  optionClassName?: string;
  variant?: string;
};

const SelectField = (props: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedValue = props.value ?? props.defaultValue ?? "";
  const selectedOption = props.options.find(
    (option) => option.value === selectedValue
  );

  const handleSelect = (val: string) => {
    props.onChange?.(val);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      className={`w-full h-[38px] ${props.className || ""} ${
        // props.variant ? "flex" : ""
        ""
      }`}
      ref={ref}
    >
      <div className="flex items-center justify-between">
        {props.label && (
          <label htmlFor={props.name} className="block mb-1 mr-6">
            {props.label}
          </label>
        )}

        <button
          id={props.name}
          type="button"
          disabled={props.disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => !props.disabled && setOpen((o) => !o)}
          className={`min-w-[20rem] flex justify-between items-center border rounded-sm p-3 text-sm
          focus:outline-none focus:ring-2 focus:ring-sky-500 transition
          ${props.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${props.errorMsg ? "border-red-500" : "border-gray-300"}`}
        >
          <span className={`${!selectedOption ? "text-gray-400" : ""}`}>
            {selectedOption ? selectedOption.label : props.placeholder}
          </span>
          <IconArrowDown className="h-4 w-4 bg-black" />
        </button>
      </div>

      {open && (
        <ul
          role="listbox"
          tabIndex={-1}
          className="w-[20rem] relative -top-[50%]  translate-y-[-50%] z-10 mb-4 ml-auto max-fit  overflow-auto rounded-lg border border-gray-200 bg-white shadow-md"
        >
          {props.options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === selectedValue}
              onClick={() => !option.disabled && handleSelect(option.value)}
              className={` px-3 py-2 text-sm hover:bg-accent_opacity transition
                ${
                  option.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
                ${option.value === selectedValue ? "bg-accent_opacity" : ""}
                ${props.optionClassName}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      <InputError errorMsg={props.errorMsg} />
    </div>
  );
};
export default SelectField;
