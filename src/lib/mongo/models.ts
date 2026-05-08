import { DbModel } from "@/types/mongo";

export const FileModel: DbModel = {
  name: "file",
};

export const FormModel: DbModel = {
  name: "form",
};

export const InputModel: DbModel = {
  name: "input",
};

export const PostModel: DbModel = {
  name: "post",
};

export const ProtocolModel: DbModel = {
  name: "protocol",
};

export const ResultModel: DbModel = {
  name: "result",
};

export const TopicModel: DbModel = {
  name: "topic",
};

export const UserModel: DbModel = {
  name: "user",
};

export enum UserRole {
  MODERATOR = "moderator",
  ADMIN = "admin",
}

export enum TemplateFormId {
  SURVEY = "survey",
  SIP = "sip",
  STRIKE = "strike",
  ELECTIONS = "elections",
  MEETING = "meeting",
  TRAVEL = "travel",
  LEAFLETING = "leafleting",
}
