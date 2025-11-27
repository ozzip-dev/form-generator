import { TopicCategory } from "@/enums/forum";
import { insert } from "@/lib/mongo";
import { Topic } from "@/types/forum";
import { Db, ObjectId } from "mongodb";

export async function createTopic(
  db: Db,
  userId: ObjectId,
  title: string,
  description: string,
  category: TopicCategory,
): Promise<ObjectId> {
  const now: Date = new Date();
  const insertData: Partial<Topic> = {
    createdBy: userId,
    createdAt: now,
    updatedAt: now,
    title,
    description,
    category
  };

  const { insertedId } = await insert<Topic>(db, 'topic', insertData);

  return insertedId; // or void?
}