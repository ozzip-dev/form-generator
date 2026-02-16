import { InputType } from "@/enums";
import { FormInput, FormOption, Input } from "@/types/input";

export const OPTION_OTHER = "other";

export const isOptionOther = (option: FormOption): boolean =>
  option.value == OPTION_OTHER;

export const inputHasOther = (input: FormInput) =>
  input?.options.some((option) => isOptionOther(option));

export const isInputTypeParagraph = (input: Input | FormInput) =>
  input.type === InputType.PARAGRAPH;

export const isInputTypeCheckbox = (input: Input | FormInput) =>
  input.type === InputType.CHECKBOX;

export const isInputWithOptions = ({ type }: Input | FormInput) =>
  type === InputType.CHECKBOX || type === InputType.SINGLE_SELECT;

/* osobny helper gdyby więcej typów doszło */
export const isInputSubmittable = (input: Input | FormInput) =>
  input.type !== InputType.PARAGRAPH;

const isInputVisibile = (input: Input | FormInput) => !input.hidden;

export const isInputDisplayedInResults = (input: Input | FormInput) =>
  isInputSubmittable(input) && isInputVisibile(input);
