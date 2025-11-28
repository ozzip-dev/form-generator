import { UserRole } from "@/models/User";
import { User } from "better-auth";
import { Document } from "mongodb";

export type CommitteeInfoKey = 'committeeName' | 'committeeEmail' | 'committeePhone' | 'committeeUnion'

export type UserCommitteeInfo = Record<CommitteeInfoKey, string>

type UserWithCommittee = User & UserCommitteeInfo

// TODO Pawel: infer addition fields globally, edit IUser => User
export interface IUser extends Document, UserWithCommittee {
  role: UserRole | string;
}

export interface UserSerialized extends Omit<IUser, '_id'> {
  _id: string
}