"use client";

import { FieldErrors, UseFormRegister, Path } from "react-hook-form";
import { DataLoader, InputError } from "../../index";
import TextareaField from "./TextareaField";
import InputField from "./InputField";
import FloatingLabel from "./FloatingLabel";
import { InputData, InputType } from "@/enums";
import InputTexts from "../input-texts/InputTexts";

type Props = {
  inputsData: InputData[];
  errorMsg?: any;
  register?: UseFormRegister<any>;
  onChange?: (name: string, value: string, meta?: any) => void | Promise<void>;
  isLoading?: Record<string, boolean>;
  isSubmitting?: boolean;
  default?: Record<string, string>;
  variant?: "horizontal";
};

const InputFields = (props: Props) => {
  return (
    <>
      {props.inputsData.map((inputData) => {
        const {
          staticLabel,
          floatingLabel,
          required,
          unique,
          description,
          name,
          type,
          labelClassName,
          hidden,
        } = inputData;

        const isTextArea = type === InputType.SUPER_TEXT;

        return (
          <div
            key={name}
            className={`relative text-sm ${
              props.variant === "horizontal"
                ? "flex flex-col md:flex-row md:items-center"
                : ""
            } ${staticLabel ? "pb-[1.7rem] md:mt-[1.7rem]" : "mt-[1.7rem] pb-[1.7rem]"}`}
          >
            <InputTexts
              label={staticLabel}
              description={description}
              required={required}
              unique={unique}
              hidden={hidden}
            />

            {isTextArea ? (
              <TextareaField
                inputData={inputData}
                register={props.register}
                onChange={props.onChange}
                isLoading={props.isLoading}
                default={props.default}
                error={props.errorMsg}
              />
            ) : (
              <InputField
                inputData={inputData}
                register={props.register}
                onChange={props.onChange}
                isLoading={props.isLoading}
                isSubmitting={props.isSubmitting}
                default={props.default}
                variant={props.variant}
                error={props.errorMsg}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

export default InputFields;
