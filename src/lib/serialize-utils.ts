import { File, FileSerialized } from "@/types/file";
import { Form, FormSerialized } from "@/types/form";
import { Post, PostSerialized, Topic, TopicSerialized } from "@/types/forum";
import { Protocol, ProtocolSerialized } from "@/types/protocol";
import { Submission, SubmissionSerialized } from "@/types/result";
import { IUser, UserSerialized } from "@/types/user";

export function serializeForm(form: Form): FormSerialized {
  const { _id, createdAt, createdBy, updatedAt } = form;

  return {
    ...form,
    _id: _id?.toString(),
    createdBy: createdBy?.toString(),
    createdAt: createdAt?.toISOString(),
    updatedAt: updatedAt?.toISOString(),
  };
}

export function serializeFile(file: File): FileSerialized {
  const { _id, data, uploadedAt, uploadedBy, lastModifiedAt } = file;
  const base64 = btoa(String.fromCharCode(...data.buffer));

  return {
    ...file,
    _id: _id?.toString(),
    data: base64,
    uploadedBy: uploadedBy?.toString(),
    uploadedAt: uploadedAt?.toISOString(),
    lastModifiedAt: lastModifiedAt?.toISOString(),
  };
}

export function serializeProtocol(protocol: Protocol): ProtocolSerialized {
  const { _id, disputeStartDate, lastModifiedAt, uploadedAt, uploadedBy } =
    protocol;

  return {
    ...protocol,
    _id: _id?.toString(),
    disputeStartDate: disputeStartDate.toISOString(),
    uploadedAt: uploadedAt?.toISOString(),
    uploadedBy: uploadedBy?.toString(),
    lastModifiedAt: lastModifiedAt?.toISOString(),
  };
}

export function serializeUser(user: IUser): UserSerialized {
  return {
    ...user,
    _id: user._id.toString(),
  };
}

export function serializePost(post: Post): PostSerialized {
  const { _id, topicId, createdAt, createdBy, updatedAt } = post;

  return {
    ...post,
    _id: _id.toString(),
    topicId: topicId.toString(),
    createdAt: createdAt.toISOString(),
    createdBy: createdBy.toString(),
    updatedAt: updatedAt.toISOString(),
  };
}

export function serializeTopic(topic: Topic): TopicSerialized {
  const { _id, createdAt, createdBy, updatedAt } = topic;

  return {
    ...topic,
    _id: _id.toString(),
    createdAt: createdAt.toISOString(),
    createdBy: createdBy.toString(),
    updatedAt: updatedAt.toISOString(),
  };
}
export function serializeResultSubmission(
  submission: Submission
): SubmissionSerialized {
  return {
    ...submission,
    id: submission.id.toString(),
    submittedAt: submission.submittedAt?.toISOString(),
  };
}
