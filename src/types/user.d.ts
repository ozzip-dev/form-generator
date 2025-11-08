import { UserRole } from "@/models/User";
import { User } from "better-auth";

export type CommitteeInfoKey = 'committeeName' | 'committeeEmail' | 'committeePhone' | 'committeeUnion'

export type UserCommitteeInfo = Record<CommitteeInfoKey, string>

type UserWithCommittee = User & UserCommitteeInfo

export interface IUser extends UserWithCommittee {
  _id: ObjectId
  role: UserRole;
}

export interface UserSerialized extends Omit<IUser, '_id'> {
  _id: string
}