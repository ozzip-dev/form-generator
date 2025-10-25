import { formHasInputWithId } from "@/services/form-service";
import { Db, ObjectId } from "mongodb";

export const checkFormHasInputWithId = (
  db: Db,
  formId: ObjectId,
  inputId: string
): boolean => {
  if (!formHasInputWithId(db, formId, inputId)) {
    // TODO: or throw error?
    console.error(`Form doesn\'t contain input: ${inputId}`);
    return false;
  }
  return true;
}