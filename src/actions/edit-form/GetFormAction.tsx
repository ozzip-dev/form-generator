import { requireUser } from "@/dataAccessLayer/queries";
import { db, findById } from "@/lib/mongo";
import { Form } from "@/types/form";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { cache } from "react";

export const GetFormAction = cache(async (formId: string): Promise<Form> => {
  await requireUser();

  try {
    const form = await findById(db, "form", new ObjectId(formId));

    if (!form) {
      console.error(`Form not found: ${formId}`);
      redirect("/dashboard-moderator");
    }

    return form as Promise<Form>;
  } catch (err: any) {
    throw new Error(`Błąd pobierania danych: ${err}`);
  }
});
