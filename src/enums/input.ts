export enum InputType {
  TEXT = "text",
  SUPER_TEXT = "superText" /* ? */,
  EMAIL = "email",
  DATE = "date",
  NUMBER = "number",
  PESEL = "pesel",
  CHECKBOX = "checkbox",
  SINGLE_SELECT = "singleSelect",
  PARAGRAPH = "paragraph",
}

export type InputData = {
  staticLabel?: string;
  floatingLabel?: string;
  name: string;
  placeholder?: string;
  type: InputType | "password";
  defaultValue?: string;
  description?: string;
  required?: boolean;
  unique?: boolean;
  dataAttribut?: string;
  labelClassName?: string;
  hidden?: boolean;
};
