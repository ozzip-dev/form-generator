import { TopicCategory } from "@/enums/forum";
import { Document, ObjectId } from "mongodb";

export interface Post extends Document {
  _id: ObjectId;
  topicId: ObjectId;
  // title?: string; // ??
  content: string; // ??
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  // tags? type? ...?
}

export interface PostSerialized extends Document {
  _id: string;
  topicId: string;
  // title?: string;
  content: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Topic extends Document {
  _id: ObjectId;
  title: string; // ??
  description?: string; // ??
  category: TopicCategory; // ??
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  // tags? type? related form id(s)? ...?
}

export interface TopicSerialized extends Document {
  _id: string;
  title: string;
  description?: string;
  category: TopicCategory;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type TopicSerializedWithPostCount = TopicSerialized & {
  postCount: number;
};

export type TopicSerializedDetailed = TopicSerialized & {
  authorName: string;
  posts: PostDetailed[];
};
