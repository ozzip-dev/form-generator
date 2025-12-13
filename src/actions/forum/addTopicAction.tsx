"use server";

import { TopicCategory } from "@/enums/forum";
import { ModelFieldErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { createTopic } from "@/services/forum-service";
import { requireUser } from "@/services/user-service";

export async function addTopicAction(
  title: string,
  category: TopicCategory,
  description?: string
): Promise<void | { error: ModelFieldErrors }> {
  throw new Error("Blad przy tworzeniu tematu");
  const user = await requireUser();

  const id = await createTopic(user.id, title, category, description);
  if (!id) throw new Error("Blad przy tworzeniu tematu");
}
