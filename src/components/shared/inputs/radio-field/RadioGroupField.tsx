"use client";

import { OPTION_OTHER } from "@/helpers/inputHelpers";
import { useFormContext } from "react-hook-form";
import { useState, useRef } from "react";
import InputError from "../InputError";
import InputRadioOther from "./InputRadioOther";
import InputDescription from "../FormDescription";
import InputIndicators from "../InputIndicators";

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
  hidden: boolean;
};

const RadioGroupField = (props: Props) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const value = watch(props.name);
  const errorMsg = (errors[props.name]?.message as string) || "";

  const radioLabels = props.options
    .filter((o) => o.value !== OPTION_OTHER)
    .map((o) => o.label);

  const isRadioValue = radioLabels.includes(value);

  const getRadioIndices = () =>
    props.options
      .map((opt, i) => (opt.value !== OPTION_OTHER ? i : -1))
      .filter((i) => i !== -1);

  const navigateToOption = (offset: number) => {
    const radioIndices = getRadioIndices();
    const currentPosition = radioIndices.indexOf(focusedIndex);
    const nextPosition =
      (currentPosition + offset + radioIndices.length) % radioIndices.length;
    const nextIndex = radioIndices[nextPosition];
    setFocusedIndex(nextIndex);
    setTimeout(() => inputRefs.current[nextIndex]?.focus(), 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      navigateToOption(1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      navigateToOption(-1);
    }
  };

  return (
    <div className="flex flex-col text-sm">
      {props.label && (
        <label className="mb-6 font-semibold">
          <span>{props.label}</span>
          <InputIndicators
            required={props.required}
            unique={props.unique}
            hidden={props.hidden}
          />
        </label>
      )}

      {props.description && (
        <InputDescription description={props.description} variant="published" />
      )}

      <fieldset
        className={`relative flex flex-col gap-6 ${props.className ?? ""}`}
        aria-required={props.required}
        aria-invalid={!!errorMsg}
      >
        {props.options.map((option, idx) => {
          const isOther = option.value === OPTION_OTHER;
          const isChecked = !isOther && value === option.label;
          const optionId = `${props.name}-option-${idx}`;

          return (
            <div key={option.value} className="flex flex-col">
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
                  htmlFor={optionId}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <input
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    id={optionId}
                    type="radio"
                    name={props.name}
                    value={option.label}
                    checked={isChecked}
                    tabIndex={focusedIndex === idx ? 0 : -1}
                    aria-label={`Select ${option.label}`}
                    aria-describedby={
                      errorMsg ? `${props.name}-error` : undefined
                    }
                    className="peer sr-only"
                    onChange={() =>
                      setValue(props.name, option.label, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }
                    onKeyDown={handleKeyDown}
                    onFocus={() => setFocusedIndex(idx)}
                  />

                  <span className="flex h-7 w-7 items-center justify-center rounded-full border transition peer-checked:border-accent peer-checked:bg-accent peer-checked:shadow-[inset_0_0_0_2px_white] peer-focus:ring-2 peer-focus:ring-accent peer-focus:ring-offset-2"></span>
                  <div className="block w-full text-sm">{option.label}</div>
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
          nameId={props.name}
        />
      </fieldset>
    </div>
  );
};

export default RadioGroupField;
