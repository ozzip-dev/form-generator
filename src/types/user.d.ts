import { UserRole } from "@/models/User";
import { User } from "better-auth";

export interface IUser extends User {
  role: UserRole
}