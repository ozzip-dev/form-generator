import { TopicCategory } from "@/enums/forum";
import { db, deleteById, find, insert } from "@/lib/mongo";
import { serializePost } from "@/lib/serialize-utils";
import { Post, PostSerialized, Topic } from "@/types/forum";
import { DeleteResult, ObjectId } from "mongodb";

export async function createTopic(
  userId: string,
  title: string,
  category: TopicCategory,
  description?: string
): Promise<ObjectId> {
  const now: Date = new Date();
  const insertData: Partial<Topic> = {
    createdBy: new ObjectId(userId),
    createdAt: now,
    updatedAt: now,
    title,
    description,
    category
  };

  const { insertedId } = await insert<Topic>(db, 'topic', insertData);

  return insertedId;
}

export async function removeTopic(topicId: string): Promise<DeleteResult> {
  return await deleteById<Topic>(db, "topic", new ObjectId(topicId));
}

export async function addPost(
  userId: string,
  topicId: string,
  content: string,
): Promise<string> {
  const now: Date = new Date();
  const insertData: Partial<Post> = {
    createdBy: new ObjectId(userId),
    createdAt: now,
    updatedAt: now,
    topicId: new ObjectId(topicId),
    content
  };

  const { insertedId } = await insert<Post>(db, 'post', insertData);

  return insertedId.toString();
}

export async function getPostsByTopicId(topicId: string): Promise<PostSerialized[]> {
  const posts = await find<Post>(db, "post", { topicId: new ObjectId(topicId) }, { createdAt: 1 });
  return posts.map(serializePost);
}

export async function removePost(postId: string): Promise<DeleteResult> {
  return await deleteById<Post>(db, "post", new ObjectId(postId));
}