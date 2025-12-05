"use server";

import { TopicCategory } from "@/enums/forum";
import { ModelFieldErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { createTopic } from "@/services/forum-service";
import { requireUser } from "@/services/user-service";

export async function addTopic(
  title: string,
  category: TopicCategory,
  description?: string
): Promise<void | { error: ModelFieldErrors }> {
  const user = await requireUser()

  await createTopic(user.id, title, category, description)
}
