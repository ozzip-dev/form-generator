import { TopicCategory } from "@/enums/forum";
import {
  db,
  deleteById,
  find,
  findById,
  getCollection,
  getCount,
  insert,
} from "@/lib/mongo";
import { serializePost, serializeTopic } from "@/lib/serialize-utils";
import {
  Post,
  PostSerialized,
  Topic,
  TopicSerializedDetailed,
  TopicSerializedWithPostCount,
} from "@/types/forum";
import { Collection, DeleteResult, ObjectId } from "mongodb";
import { cache } from "react";
import { requireUser } from "./user-service";
import { redirect } from "next/navigation";
import { IUser } from "@/types/user";

export async function getTopicIds(): Promise<string[]> {
  const collection: Collection<Topic> = getCollection<Topic>(db, "topic");
  const topicIds = (
    await collection.find({}).project({ _id: 1 }).toArray()
  ).map(({ _id }) => _id.toString());
  return topicIds;
}

export const getTopic = cache(async (topicId: string): Promise<Topic> => {
  await requireUser();

  const topic: Topic | null = await findById<Topic>(
    db,
    "topic",
    new ObjectId(topicId)
  );

  if (!topic) {
    console.error(`Topic not found: ${topicId}`);
    redirect("/dashboard-moderator");
  }

  return topic;
});

export const getTopicWithPostCount = cache(
  async (topicId: string): Promise<TopicSerializedWithPostCount> => {
    await requireUser();

    const topic: Topic | null = await getTopic(topicId);
    const postCount = await getCount(db, "post", {
      topicId: new ObjectId(topicId),
    });

    return {
      ...serializeTopic(topic),
      postCount,
    };
  }
);

export const getDetailedTopic = cache(
  async (topicId: string): Promise<TopicSerializedDetailed> => {
    await requireUser();

    const topic: Topic | null = await getTopic(topicId);
    const posts: Post[] = await find(db, "post", {
      topicId: new ObjectId(topicId),
    });
    const author: IUser | null = await findById(
      db,
      "user",
      new ObjectId(topic.createdBy)
    );

    return {
      ...serializeTopic(topic),
      posts: posts.map(serializePost),
      authorName: author?.name || "[ autor ]",
    };
  }
);

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
    category,
  };

  const { insertedId } = await insert<Topic>(db, "topic", insertData);

  return insertedId;
}

export async function removeTopic(topicId: string): Promise<DeleteResult> {
  return await deleteById<Topic>(db, "topic", new ObjectId(topicId));
}

export async function addPost(
  userId: string,
  topicId: string,
  content: string
): Promise<string> {
  const now: Date = new Date();
  const insertData: Partial<Post> = {
    createdBy: new ObjectId(userId),
    createdAt: now,
    updatedAt: now,
    topicId: new ObjectId(topicId),
    content,
  };

  const { insertedId } = await insert<Post>(db, "post", insertData);

  return insertedId.toString();
}

export async function getPostsByTopicId(
  topicId: string
): Promise<PostSerialized[]> {
  const posts = await find<Post>(
    db,
    "post",
    { topicId: new ObjectId(topicId) },
    { createdAt: 1 }
  );
  return posts.map(serializePost);
}

export async function removePost(postId: string): Promise<DeleteResult> {
  return await deleteById<Post>(db, "post", new ObjectId(postId));
}
