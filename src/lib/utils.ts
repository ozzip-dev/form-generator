import { UserRole } from "@/models/User";
import { IUser } from "@/types/user";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TODO: replace with proper functions or use eg. https://www.npmjs.com/package/date-fns
const parseTime = (units: number) => (units < 10 ? `0${units}` : units);
export const formatDate = (date: Date) => `
  ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
  (${parseTime(date.getHours())} : ${parseTime(
  date.getMinutes()
)} : ${parseTime(date.getSeconds())})
`;

export const convertBToKB = (bytes: number): string => {
  return (bytes / 1024).toFixed(2);
};

/* user */
export const isModerator = (user: IUser): boolean => (
  user.role === UserRole.MODERATOR
)