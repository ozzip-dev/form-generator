import { InputType } from "@/enums";

export const dataSelectOptions = [
  { label: "Odpowiedź krótka", value: InputType.TEXT },
  { label: "Odpowiedź długa", value: InputType.SUPER_TEXT },
  { label: "Email", value: InputType.EMAIL },
  { label: "Data", value: InputType.DATE },
  { label: "Numer", value: InputType.NUMBER },
  { label: "Wybór pojedynczy", value: InputType.SINGLE_SELECT },
  { label: "Wybór wielokrotny", value: InputType.CHECKBOX },
  { label: "Tekst informacyjny", value: InputType.PARAGRAPH },
];
