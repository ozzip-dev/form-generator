"use client";

import { useState, useRef, useEffect } from "react";
import InputError from "./InputError";
import IconArrowDown from "@/icons/iconArrowDown/IconArrowDown";

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
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  errorMsg?: string;
  className?: string;
  optionClassName?: string;
};

const Select = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(props.defaultValue || "");
  const ref = useRef<HTMLDivElement>(null);

  const isControlled = props.value !== undefined;
  const selectedValue = isControlled ? props.value : internalValue;

  const selectedOption = props.options.find((o) => o.value === selectedValue);

  const handleSelect = (val: string) => {
    if (!isControlled) setInternalValue(val);
    props.onChange?.(val);
    setOpen(false);
  };

  useEffect(() => {
    if (!isControlled && props.defaultValue) {
      setInternalValue(props.defaultValue);
      props.onChange?.(props.defaultValue);
    }
  }, [props, isControlled]);

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
    <div className={`w-full ${props.className} h-10`} ref={ref}>
      {props.label && (
        <label
          htmlFor={props.name}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
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
        className={`w-full flex justify-between items-center border rounded-lg p-1 text-left 
          focus:outline-none focus:ring-2 focus:ring-sky-500 transition
          ${props.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${props.errorMsg ? "border-red-500" : "border-gray-300"}`}
      >
        <span className={`${!selectedOption ? "text-gray-400" : ""}`}>
          {selectedOption ? selectedOption.label : props.placeholder}
        </span>
        <IconArrowDown className="h-4 w-4 bg-black" />
      </button>

      {open && (
        <ul
          role="listbox"
          tabIndex={-1}
          className="relative -top-[50%]  translate-y-[-50%] z-10 mb-4 max-fit  overflow-auto rounded-lg border border-gray-200 bg-white shadow-md"
        >
          {props.options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === selectedValue}
              onClick={() => !option.disabled && handleSelect(option.value)}
              className={`px-3 py-2 text-sm hover:bg-sky-50 transition 
                ${
                  option.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
                ${option.value === selectedValue ? "bg-sky-100" : ""}
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

export default Select;
