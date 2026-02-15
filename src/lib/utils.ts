import { UserRole } from "@/models/User";
import { IUser, UserSerialized } from "@/types/user";

export const convertBToKB = (bytes: number): string => {
  return (bytes / 1024).toFixed(2);
};

export function makeId(text: string): string {
  return `${text
    .trim()
    .toLowerCase()
    .replaceAll(" ", "-")
    .substring(0, 16)}-${Math.round(Math.random() * 100000).toString()}`;
}

export const downloadFile = (blob: Blob, name: string) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
};

/* user */
export const isModerator = (user: IUser | UserSerialized): boolean =>
  user.role === UserRole.MODERATOR;

export const isAdmin = (user: IUser | UserSerialized): boolean =>
  user.role === UserRole.ADMIN;
