import { File, FileSerialized } from "@/types/file";
import { Form, FormSerialized } from "@/types/form";
import { Protocol, ProtocolSerialized } from "@/types/protocol";
import { Submission, SubmissionSerialized } from "@/types/result";
import { IUser, UserSerialized } from "@/types/user";

export function serializeForm(form: Form): FormSerialized {
  const {
    _id,
    createdAt,
    createdBy,
    updatedAt,
    url,
    state,
    id,
    title,
    description,
    inputs,
    type,
  } = form;

  return {
    _id: _id?.toString(),
    id,
    type,
    title,
    description,
    createdBy: createdBy?.toString(),
    createdAt: createdAt?.toISOString(),
    updatedAt: updatedAt?.toISOString(),
    url,
    state,
    inputs,
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
  const { _id, disputeStartDate, lastModifiedAt, uploadedAt } = protocol;

  return {
    ...protocol,
    _id: _id?.toString(),
    disputeStartDate: disputeStartDate.toISOString(),
    uploadedAt: uploadedAt?.toISOString(),
    lastModifiedAt: lastModifiedAt?.toISOString(),
  };
}

export function serializeUser(user: IUser): UserSerialized {
  return {
    ...user,
    _id: user._id.toString(),
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
