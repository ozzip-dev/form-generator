import { Db } from "mongodb";
import {
  db,
  deleteById,
  find,
  findById,
  findOne,
  insert,
  update,
  updateById,
} from "@/lib/mongo";
import { EventLogType } from "@/enums/event-log";
import { UserCommitteeInfo } from "@/types/user";

const addEventLog = async (
  eventType: EventLogType,
  userId?: string,
  data?: unknown,
): Promise<void> => {
  const now = new Date();

  await insert(db, "event_log", {
    eventType,
    createdAt: now,
    userId,
    data,
  });
};

export const addAccountCreatedLog = async (userId: string) => {
  await addEventLog(EventLogType.ACCOUNT_CREATED, userId);
};

export const addEmailVerifiedLog = async (userId: string) => {
  await addEventLog(EventLogType.EMAIL_VERIFIED, userId);
};

export const addPrivacyPolicyConfirmedLog = async (userId: string) => {
  await addEventLog(EventLogType.PRIVACY_POLICY_CONFIRMED, userId);
};

export const addPasswordResetLog = async (userId: string) => {
  await addEventLog(EventLogType.PASSWORD_RESET, userId);
};

export const addCommitteeDetailsUpdatedLog = async (
  userId: string,
  data: Partial<UserCommitteeInfo>,
) => {
  await addEventLog(EventLogType.COMMITTEE_DETAILS_UPDATED, userId, data);
};
