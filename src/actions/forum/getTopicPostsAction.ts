"use server";

import { getPostsByTopicId } from "@/services/forum-service";
import { PostSerialized } from "@/types/forum";

export async function getTopicPostsAction(topicId: string): Promise<PostSerialized[] | null> {
  try {
    const posts = await getPostsByTopicId(topicId)
    if (!posts) throw new Error('Invalid topic id')
    return posts

  } catch (error) {
    console.error("Error fetching topic posts: ", error);
    return null;
  }
}
