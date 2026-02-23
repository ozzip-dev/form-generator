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
  const [focusedIndex, setFocusedIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const selectedValue = value ?? defaultValue ?? "";
  const selectedOption = options.find((o) => o.value === selectedValue);

  const handleSelect = (val: string, fromKeyboard = false) => {
    onChange?.(val);
    setOpen(false);
    if (fromKeyboard && buttonRef.current) {
      setTimeout(() => buttonRef.current?.focus(), 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      setOpen(!open);
      if (!open) {
        setFocusedIndex(0);
      }
    }
  };

  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    idx: number,
  ) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = (idx + 1) % options.length;
      setFocusedIndex(nextIdx);
      optionRefs.current[nextIdx]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIdx = (idx - 1 + options.length) % options.length;
      setFocusedIndex(prevIdx);
      optionRefs.current[prevIdx]?.focus();
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (!options[idx].disabled) {
        handleSelect(options[idx].value, true);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
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

  useEffect(() => {
    if (open && optionRefs.current[0]) {
      setTimeout(() => optionRefs.current[0]?.focus(), 0);
    }
  }, [open]);

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
          ref={buttonRef}
          id={name}
          type="button"
          disabled={disabled}
          aria-label={`${label || name}, current selection: ${selectedOption?.label || placeholder}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => !disabled && setOpen((o) => !o)}
          onKeyDown={handleKeyDown}
          className={`flex w-full items-center justify-between rounded-sm border bg-white p-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} `}
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
            {options.map((option, idx) => (
              <li
                key={option.value}
                ref={(el) => {
                  optionRefs.current[idx] = el;
                }}
                role="option"
                tabIndex={focusedIndex === idx ? 0 : -1}
                aria-label={`Select ${label || name}: ${option.label}`}
                aria-selected={option.value === selectedValue}
                onClick={() => !option.disabled && handleSelect(option.value)}
                onKeyDown={(e) => handleOptionKeyDown(e, idx)}
                onFocus={() => setFocusedIndex(idx)}
                className={`px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                  option.disabled
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:bg-accent"
                } ${option.value === selectedValue ? "bg-accent" : focusedIndex === idx ? "bg-accent_light" : ""} `}
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
