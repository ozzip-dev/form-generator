import { UserRole } from "@/models/User";
import { User } from "better-auth";

// TODO: name?
export interface IUser extends User {
  role: UserRole
}