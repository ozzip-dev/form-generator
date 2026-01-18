"use server";

import { isItemAuthor } from "@/helpers/forumHelpers";
import { db, findById } from "@/lib/mongo";
import { removeTopic } from "@/services/forum-service";
import { requireUser } from "@/services/user-service";
import { Topic } from "@/types/forum";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function removeTopicAction(topicId: string): Promise<void> {
  const user = await requireUser();

  const topic = await findById<Topic>(db, "topic", new ObjectId(topicId));
  if (!topic) throw new Error("Invalid topic id");
  if (!isItemAuthor(user, topic))
    throw new Error("Only authors can delete their topics");

  try {
    const { deletedCount } = await removeTopic(topicId);

    if (!deletedCount) throw new Error("Error. Topic not deleted");

    revalidateTag("topics");
  } catch (_) {
    throw new Error("Failed to remove topic");
  }

  redirect("/forum/list");
}
