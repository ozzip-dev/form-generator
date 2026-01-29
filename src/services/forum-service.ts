import { TopicCategory } from "@/enums/forum";
import {
  db,
  deleteById,
  find,
  findById,
  getCollection,
  getCount,
  insert,
  update,
} from "@/lib/mongo";
import { serializePost, serializeTopic } from "@/lib/serialize-utils";
import {
  Post,
  PostSerialized,
  PostSerializedDetailed,
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
    new ObjectId(topicId),
  );

  if (!topic) {
    console.error(`Topic not found: ${topicId}`);
    // TODO: przemyśleć dashbaord
    redirect("/forms/list");
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
  },
);

export const getDetailedTopic = cache(
  async (topicId: string): Promise<TopicSerializedDetailed> => {
    await requireUser();

    const topic: Topic = await getTopic(topicId);
    const posts: Post[] = await find(db, "post", {
      topicId: new ObjectId(topicId),
    });

    const postAuthorIds = [
      ...new Set(posts.map(({ createdBy }) => createdBy.toString())),
    ].map((id) => new ObjectId(id));
    const topicAuthorId = new ObjectId(topic.createdBy);

    const users = (await find(db, "user", {
      _id: { $in: [...postAuthorIds, topicAuthorId] },
    })) as IUser[];
    const author = users.find(({ _id }) => _id == topicAuthorId.toString());

    return {
      ...serializeTopic(topic),
      posts: posts.map((post) => getDetailedPost(post, users)),
      authorName: author?.name || "[ autor tematu ]",
    };
  },
);

export const getDetailedPost = (
  post: Post,
  users: IUser[],
): PostSerializedDetailed => {
  const authorName =
    users.find(({ _id }) => _id == post.createdBy.toString())?.name ||
    "[ autor posta ]";

  return {
    ...serializePost(post),
    authorName,
  };
};

export async function createTopic(
  userId: string,
  title: string,
  category: TopicCategory,
  description?: string,
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
  content: string,
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

  await updateTopicModifiedDate(new ObjectId(topicId));

  return insertedId.toString();
}

export async function getPostsByTopicId(
  topicId: string,
): Promise<PostSerialized[]> {
  const posts = await find<Post>(
    db,
    "post",
    { topicId: new ObjectId(topicId) },
    { createdAt: 1 },
  );
  return posts.map(serializePost);
}

export async function removePost(postId: string): Promise<DeleteResult> {
  return await deleteById<Post>(db, "post", new ObjectId(postId));
}

export async function updateTopicModifiedDate(
  topicId: ObjectId,
): Promise<void> {
  await update(
    db,
    "topic",
    {
      _id: topicId,
    },
    {
      $set: {
        updatedAt: new Date(),
      },
    },
  );
}

export async function updateTopic(
  topicId: string,
  title: string,
  category: TopicCategory,
  description?: string,
): Promise<void> {
  await update(
    db,
    "topic",
    {
      _id: new ObjectId(topicId),
    },
    {
      $set: {
        title,
        description,
        category,
        updatedAt: new Date(),
      },
    },
  );
}
