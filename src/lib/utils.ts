import { UserRole } from "@/models/User";
import { IUser } from "@/types/user";

export const convertBToKB = (bytes: number): string => {
  return (bytes / 1024).toFixed(2);
};

export function makeId(header: string): string {
  return `${header
    .trim()
    .toLowerCase()
    .replaceAll(" ", "-")
    .substring(0, 10)}-${Math.round(Math.random() * 100000).toString()}`;
}

export const downloadFile = (blob: Blob, name: string) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
};

/* user */
export const isModerator = (user: IUser): boolean =>
  user.role === UserRole.MODERATOR;
