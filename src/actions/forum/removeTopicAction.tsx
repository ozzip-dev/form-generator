"use server";

import { isTopicAuthor } from "@/helpers/forumHelpers";
import { db, findById } from "@/lib/mongo";
import { removeTopic } from "@/services/forum-service";
import { requireUser } from "@/services/user-service";
import { Topic } from "@/types/forum";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

export async function removeTopicAction(topicId: string): Promise<void> {
  const user = await requireUser();

  const topic = await findById<Topic>(db, "topic", new ObjectId(topicId));
  if (!topic) throw new Error("Invalid topic id");
  if (!isTopicAuthor(user, topic))
    throw new Error("Only authors can delete their posts");

  try {
    const { deletedCount } = await removeTopic(topicId);

    if (!deletedCount) throw new Error("Error. Topic not deleted");

    revalidateTag("topics");
  } catch (_) {
    throw new Error("Failed to remove topic");
  }
}
