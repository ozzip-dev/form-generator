"use client";

import { useState, useRef, useEffect } from "react";
import Icon from "@/components/shared/icons/Icon";
import InputError from "../InputError";

export type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

type Props = {
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
};

const SelectField = ({
  name,
  options,
  value,
  defaultValue,
  onChange,
  label,
  placeholder = "Wybierz",
  disabled,
  errorMsg,
  className,
}: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedValue = value ?? defaultValue ?? "";
  const selectedOption = options.find((o) => o.value === selectedValue);

  const handleSelect = (val: string) => {
    onChange?.(val);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className={`w-full lg:flex items-center  ${className ? className : ""}`}
    >
      {label && (
        <label
          htmlFor={name}
          className=" block mb-1 md:mr-4  text-sm font-medium shrink-0"
        >
          {label}
        </label>
      )}

      <div className="relative w-full pb-[1.7rem] lg:mt-[1.7rem] ">
        <button
          id={name}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => !disabled && setOpen((o) => !o)}
          className={`
            w-full bg-white flex justify-between items-center
            border rounded-sm p-2 text-sm
            focus:outline-none
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          <span className={!selectedOption ? "text-gray-400" : ""}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          <Icon
            icon="chevron-down-solid-full"
            size={14}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <ul
            role="listbox"
            className="
              absolute left-0 top-1/2 -translate-y-1/2
              z-10 w-full
              rounded-sm border
              bg-white shadow-md
              overflow-hidden
            "
          >
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === selectedValue}
                onClick={() => !option.disabled && handleSelect(option.value)}
                className={`
                  px-3 py-2 text-sm transition
                  ${option.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:bg-accent"
                  }
                  ${option.value === selectedValue ? "bg-accent" : ""}
                `}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
        <InputError errorMsg={errorMsg} />
      </div>
    </div>
  );
};

export default SelectField;
