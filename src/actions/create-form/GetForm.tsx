import { requireUser } from "@/dataAccessLayer/queries";
import { db, findById } from "@/lib/mongo";
import { getTemplateInputs } from "@/services/input-service";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { cache } from "react";

export const GetForm = cache(async (formId: string) => {
  await requireUser();

  try {
    console.log("bbbb");
    const [form, templateInputs] = await Promise.all([
      findById(db, "form", new ObjectId(formId)),
      getTemplateInputs(db),
    ]);

    if (!form) {
      console.error(`Form not found: ${formId}`);
      redirect("/dashboard-moderator");
    }

    return { form, templateInputs };
  } catch (err: any) {
    throw new Error(`Błąd pobierania danych: ${err}`);
  }
});
