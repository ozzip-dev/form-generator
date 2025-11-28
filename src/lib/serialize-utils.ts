import { Form, FormSerialized } from "@/types/form";
import { Protocol, ProtocolSerialized } from "@/types/protocol";
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

export function serializeProtocol(protocol: Protocol): ProtocolSerialized {
  const {
    _id,
    data,
    name,
    description,
    size,
    type,
    uploadedAt,
    lastModifiedAt,
    uploadedBy,
  } = protocol;
  const base64 = btoa(String.fromCharCode(...data.buffer));
  return {
    _id: _id?.toString(),
    data: base64,
    name,
    description,
    type,
    size,
    uploadedBy: uploadedBy?.toString(),
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
