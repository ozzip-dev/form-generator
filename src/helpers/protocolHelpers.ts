import { Protocol, ProtocolSerialized } from "@/types/protocol";
import { IUser, UserSerialized } from "@/types/user";

export const isProtocolAuthor = (
  user: IUser | UserSerialized,
  protocol: Protocol | ProtocolSerialized
): boolean => {
  const { _id, id } = user;
  return !!protocol._id && [id, _id].includes(protocol.uploadedBy.toString());
};
