import { TopicCategory } from "@/enums/forum";
import { db, deleteById, insert } from "@/lib/mongo";
import { Topic } from "@/types/forum";
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

  return insertedId; // or void?
}

export async function removeTopic(topicId: string): Promise<DeleteResult> {
  return await deleteById<Topic>(db, "topic", new ObjectId(topicId));
}