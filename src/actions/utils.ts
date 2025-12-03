import { formHasInputWithId } from "@/services/form-service";
import { Db, ObjectId } from "mongodb";

export const checkFormHasInputWithId = (
  db: Db,
  formId: ObjectId,
  inputId: string
): boolean => {
  if (!formHasInputWithId(db, formId, inputId)) {
    throw new Error(`Form doesn\'t contain input: ${inputId}`);
  }
  return true;
};
