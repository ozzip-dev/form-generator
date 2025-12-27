import { Post, PostSerialized, Topic, TopicSerialized } from "@/types/forum";
import { IUser, UserSerialized } from "@/types/user";

export const isItemAuthor = (
  user: IUser | UserSerialized,
  item: Topic | TopicSerialized | Post | PostSerialized
): boolean => {
  const { _id, id } = user
  return !!item._id && [id, _id].includes(item.createdBy.toString())
}