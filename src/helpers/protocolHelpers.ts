import {
  Protocol,
  ProtocolAttachmentCategory,
  ProtocolSerialized,
} from "@/types/protocol";
import { IUser, UserSerialized } from "@/types/user";

export const isProtocolAuthor = (
  user: IUser | UserSerialized,
  protocol: Protocol | ProtocolSerialized,
): boolean => {
  const { _id, id } = user;
  return !!protocol._id && [id, _id].includes(protocol.uploadedBy.toString());
};

const BYTES_PER_MB = 1024 * 1024;

/* when edited, change value in next.config */
export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_B = BYTES_PER_MB * MAX_FILE_SIZE_MB;

export const defaultAttachments: Record<ProtocolAttachmentCategory, unknown[]> =
  {
    demands: [],
    mediationMeetings: [],
    mediationDiscrepancy: [],
    negotiationMeetings: [],
    negotiationDiscrepancy: [],
    agreement: [],
    strike: [],
    other: [],
  };

export const parseUrl = (value: string) =>
  value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `https://${value}`;
