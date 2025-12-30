"use server";

import { ModelFieldErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { addPost } from "@/services/forum-service";
import { requireUser } from "@/services/user-service";
import { revalidateTag } from "next/cache";

export async function addPostAction(
  topicId: string,
  content: string
): Promise<void | { error: ModelFieldErrors }> {
  const user = await requireUser();

  const id = await addPost(user.id, topicId, content);
  if (!id) throw new Error("Blad przy dodawaniu odpowiedzi");

  revalidateTag("topics");
}
