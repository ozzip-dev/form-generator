"use client";

import { InputData, InputType } from "@/enums";
import { UseFormRegister } from "react-hook-form";
import InputLabel from "../input-texts/InputLabel";
import InputField from "./InputField";
import TextareaField from "./TextareaField";

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
        const { label, required, unique, description, name, type, hidden } =
          inputData;

        const isTextArea = type === InputType.SUPER_TEXT;

        return (
          <div
            key={name}
            className={` ${
              props.variant === "horizontal" &&
              "flex flex-col md:flex-row md:items-center"
            } `}
          >
            <InputLabel
              label={label}
              name={name}
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
