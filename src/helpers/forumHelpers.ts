import { Topic, TopicSerialized } from "@/types/forum";
import { IUser, UserSerialized } from "@/types/user";

export const isTopicAuthor = (
  user: IUser | UserSerialized,
  topic: Topic | TopicSerialized
): boolean => {
  const { _id, id } = user
  return !!topic._id && [id, _id].includes(topic.createdBy.toString())
}