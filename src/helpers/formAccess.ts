import { Form, FormSerialized } from "@/types/form";
import { requireUser } from "@/services/user-service";
import { isUserAuthor } from "@/helpers/formHelpers";
import { redirect } from "next/navigation";

export async function verifyUserIsFormAuthor(
  form: Form | FormSerialized,
  formId: string,
): Promise<void> {
  const user = await requireUser();

  if (!isUserAuthor(form, user.id)) {
    redirect(`/${formId}`);
  }
}
