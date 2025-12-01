import { FormOption } from "@/types/input";

export const OPTION_OTHER = 'other'

export const isOptionOther = (option: FormOption): boolean => option.value == OPTION_OTHER