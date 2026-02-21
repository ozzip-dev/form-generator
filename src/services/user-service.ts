import { db, find, findById, updateById } from "@/lib/mongo";
import { IUser, UserCommitteeInfo, UserSerialized } from "@/types/user";
import { ObjectId } from "mongodb";
import { cache } from "react";
import { serializeUser } from "@/lib/serialize-utils";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { FormType } from "@/enums/form";
import { getFormsByType } from "./form-service";
import { Form } from "@/types/form";
import { isAdmin } from "@/lib/utils";
import { UserRole } from "@/models/User";

export const requireUser = cache(async (): Promise<IUser> => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  // TODO: Pawel
  /* Always get up-to-date user data */
  const user = await getUserById(session.user.id);
  const { privacyPolicyConfirmed } = user;

  if (!privacyPolicyConfirmed) redirect("/privacy");

  return session.user;
});

// TODO Pawel:
// pobieramy usera -> drugi raz pobieramy usera zeby zwrocic Promise<UserSerialized>?
// przemyslec inny sposob
export const getUser = cache(async (): Promise<UserSerialized | null> => {
  const loggedInUser = await requireUser();
  const userId = new ObjectId(loggedInUser.id);
  const user = await findById<IUser>(db, "user", userId);

  return user ? serializeUser(user) : null;
});

export async function getUsersWithFormType(type: FormType): Promise<IUser[]> {
  const user = await requireUser();
  const forms: Form[] = await getFormsByType(type);
  const authorIds: (ObjectId | undefined)[] = forms.map(
    ({ createdBy }) => createdBy,
  );
  const authorsIdsUnique: ObjectId[] = [
    ...new Set(
      authorIds
        /* filter out currently logged in user */
        .filter((id) => id && id.toString() != user.id),
    ),
  ] as ObjectId[];

  return await find<IUser>(db, "user", { _id: { $in: authorsIdsUnique } });
}

export async function getCommitteeMembers(
  committee: UserCommitteeInfo,
): Promise<UserSerialized[]> {
  const users = await find<IUser>(db, "user", {
    committeeEmail: committee.committeeEmail,
  });
  return users.map((user) => serializeUser(user));
}

export async function getUserById(userId: string): Promise<IUser> {
  const user = await findById<IUser>(db, "user", new ObjectId(userId));
  if (!user) throw new Error("Invalid user id");
  return user;
}

export async function confirmPrivacyPolicy(userId: string): Promise<void> {
  /* throw error if incorrect */
  await findById<IUser>(db, "user", new ObjectId(userId));

  console.log(123);

  await updateById(db, "user", new ObjectId(userId), {
    $set: {
      privacyPolicyConfirmed: true,
    },
  });
}

export async function getAllModerators(): Promise<IUser[]> {
  const user = await requireUser();
  if (!isAdmin(user)) throw new Error("Invalid user type");

  const users = await find<IUser>(db, "user", { role: UserRole.MODERATOR });
  return users;
}
