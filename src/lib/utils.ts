import { UserRole } from "@/models/User";
import { IUser } from "@/types/user";

export const convertBToKB = (bytes: number): string => {
  return (bytes / 1024).toFixed(2);
};

/* user */
export const isModerator = (user: IUser): boolean =>
  user.role === UserRole.MODERATOR;
