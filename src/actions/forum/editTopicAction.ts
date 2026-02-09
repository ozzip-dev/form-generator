"use server";

import { TopicCategory } from "@/enums/forum";
import { isItemAuthor } from "@/helpers/forumHelpers";
import { ModelFieldErrors } from "@/helpers/helpers-validation/handleFormErrors";
import { getTopic, updateTopic } from "@/services/forum-service";
import { requireUser } from "@/services/user-service";
import { revalidateTag } from "next/cache";

export async function editTopicAction(
  topicId: string,
  title: string,
  category: TopicCategory,
  description?: string,
): Promise<void | { error: ModelFieldErrors }> {
  const user = await requireUser();
  const post = await getTopic(topicId);

  const isAuthor = !!(user && isItemAuthor(user, post));
  if (!isAuthor) throw new Error("Only author can edit a topic");

  await updateTopic(topicId, title, category, description);

  revalidateTag("topics");
}
