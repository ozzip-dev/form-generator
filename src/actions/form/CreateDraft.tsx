"use server";

import { requireUser } from "@/dataAccessLayer/queries";
import { db, findOne } from "@/lib/mongo";
import { createDraft } from "@/services/form-service";
import { Form } from "@/types/form";
import { Document, ObjectId } from "mongodb";
import { redirect } from "next/navigation";

// TODO: move out
const isEmpty = (templateId: string) => templateId === "empty";

export async function CreateDraft(templateId: string) {
  const user = await requireUser();

  const userId = new ObjectId(user.id);
  const formsCount = await db.collection("form").countDocuments({
    createdBy: userId,
  });

  console.log("formsCount", formsCount);

  if (formsCount >= 10) {
    console.error("Osiągnięto limit 10 formularzy");
    throw new Error(
      "Osiągnięto limit — możesz utworzyć maksymalnie 10 formularzy."
    );
  }

  // const formsCount = await db.collection("form").countDocuments({
  //   userId: new ObjectId(user.id),
  // });

  // if (formsCount >= 10) {
  //   console.error("Osiągnięto limit 10 formularzy");
  //   throw new Error("Możesz zapisać maksymalnie 10 formularzy.");
  // }

  const empty = isEmpty(templateId);

  const template: Document | null = await findOne(db, "form", {
    id: templateId,
  });

  if ((!template && !empty) || !user) {
    // TODO: add error message
    console.error("Invalid template or you got logged out");
    return;
  }

  const { title, description, inputs } = empty
    ? { title: "[ tytuł ]", description: "[ opis ]", inputs: [] }
    : (template as Form);

  const id: ObjectId = await createDraft(
    db,
    new ObjectId(user?.id),
    title || "",
    description || "",
    inputs
  );

  redirect(`/create-form/${id}/edit`);
}

// "use server";

// import { requireUser } from "@/dataAccessLayer/queries";
// import { db, findOne } from "@/lib/mongo";
// import { createDraft } from "@/services/form-service";
// import { Form } from "@/types/form";
// import { Document, ObjectId } from "mongodb";
// import { redirect } from "next/navigation";

// const isEmpty = (templateId: string) => templateId === "empty";

// export async function CreateDraft(templateId: string) {
//   const user = await requireUser();

//   if (!user) {
//     console.error("Użytkownik niezalogowany");
//     throw new Error("Musisz być zalogowany, aby utworzyć formularz.");
//   }

//   const userId = new ObjectId(user.id);

//   // 🔹 Sprawdź, ile formularzy już ma ten użytkownik
//   const formsCount = await db.collection("form").countDocuments({
//     createdBy: userId,
//   });

//   if (formsCount >= 10) {
//     console.error("Osiągnięto limit 10 formularzy");
//     throw new Error(
//       "Osiągnięto limit — możesz utworzyć maksymalnie 10 formularzy."
//     );
//   }

//   const empty = isEmpty(templateId);

//   // 🔹 Filtr po _id i createdBy
//   const template: Document | null = await findOne(db, "form", {
//     _id: new ObjectId(templateId),
//     createdBy: userId,
//   });

//   if (!template && !empty) {
//     console.error("Brak dostępu lub nie znaleziono formularza");
//     throw new Error("Nie znaleziono formularza lub brak dostępu.");
//   }

//   const { title, description, inputs } = empty
//     ? { title: "[ tytuł ]", description: "[ opis ]", inputs: [] }
//     : (template as Form);

//   const id: ObjectId = await createDraft(
//     db,
//     userId,
//     title || "",
//     description || "",
//     inputs
//   );

//   redirect(`/create-form/${id}/edit`);
// }
