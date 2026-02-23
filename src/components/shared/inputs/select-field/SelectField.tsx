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
      className={`relative mt-[1.7rem] w-full items-center pb-[1.7rem] lg:flex ${className ? className : ""}`}
    >
      {label && (
        <label
          htmlFor={name}
          className="absolute -top-[2rem] block shrink-0 text-sm md:mr-4 lg:static"
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        <button
          id={name}
          type="button"
          disabled={disabled}
          aria-label={`${label || name}, current selection: ${selectedOption?.label || placeholder}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => !disabled && setOpen((o) => !o)}
          className={`flex w-full items-center justify-between rounded-sm border bg-white p-2 text-sm focus:outline-none ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} `}
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
            className="absolute left-0 top-1/2 z-20 w-full -translate-y-1/2 overflow-hidden rounded-sm border bg-white shadow-md"
          >
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-label={`Select ${label || name}: ${option.label}`}
                aria-selected={option.value === selectedValue}
                onClick={() => !option.disabled && handleSelect(option.value)}
                className={`px-3 py-2 text-sm transition ${
                  option.disabled
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:bg-accent"
                } ${option.value === selectedValue ? "bg-accent" : ""} `}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
        <InputError errorMsg={errorMsg} nameId={name} />
      </div>
    </div>
  );
};

export default SelectField;
