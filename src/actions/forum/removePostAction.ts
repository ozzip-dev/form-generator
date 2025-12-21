"use server";

import { isItemAuthor } from "@/helpers/forumHelpers";
import { db, findById } from "@/lib/mongo";
import { removePost } from "@/services/forum-service";
import { requireUser } from "@/services/user-service";
import { Post } from "@/types/forum";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

export async function removePostAction(postId: string): Promise<void> {
  const user = await requireUser();

  const post = await findById<Post>(db, "post", new ObjectId(postId));
  if (!post) throw new Error("Invalid post id");
  if (!isItemAuthor(user, post))
    throw new Error("Only authors can delete their posts");

  try {
    const { deletedCount } = await removePost(postId);

    if (!deletedCount) throw new Error("Error. Post not deleted");

    revalidateTag("posts");
    revalidateTag("topics");
  } catch (_) {
    throw new Error("Failed to remove post");
  }
}
