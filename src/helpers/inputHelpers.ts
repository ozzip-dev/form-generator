import { InputType } from "@/enums";
import { FormInput, FormOption, Input } from "@/types/input";

export const OPTION_OTHER = "other";

export const isOptionOther = (option: FormOption): boolean =>
  option.value == OPTION_OTHER;

export const inputHasOther = (input: FormInput) =>
  input?.options.some((option) => isOptionOther(option));

export const isInputTypeParagraph = (input: Input | FormInput): boolean =>
  input?.type === InputType.PARAGRAPH;

export const isInputTypeCheckbox = (input: Input | FormInput): boolean =>
  input?.type === InputType.CHECKBOX;

export const isInputTypeShortText = (input: Input | FormInput): boolean =>
  input?.type === InputType.TEXT;

export const isInputTypeNumber = (input: Input | FormInput): boolean =>
  input?.type === InputType.NUMBER;

export const isInputTypePesel = (input: Input | FormInput): boolean =>
  input?.type === InputType.PESEL;

export const isInputTypeEmail = (input: Input | FormInput): boolean =>
  input?.type === InputType.EMAIL;

export const isInputWithOptions = ({ type }: Input | FormInput): boolean =>
  type === InputType.CHECKBOX || type === InputType.SINGLE_SELECT;

/* osobny helper gdyby więcej typów doszło */
export const isInputSubmittable = (input: Input | FormInput) =>
  input.type !== InputType.PARAGRAPH;

const isInputVisibile = (input: Input | FormInput) => !input.hidden;

export const isInputDisplayedInResults = (input: Input | FormInput) =>
  isInputSubmittable(input) && isInputVisibile(input);

export const canInputHaveAcceptedValues = (input: Input | FormInput) =>
  isInputTypeShortText(input) ||
  isInputTypeNumber(input) ||
  isInputTypePesel(input) ||
  isInputTypeEmail(input);
