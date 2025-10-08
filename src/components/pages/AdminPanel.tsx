"use client";
import { IUser } from "@/types/user";
import SignUp from "./Signup";

type Props = {
  user: IUser;
};

const AdminPanel = (props: Props) => {
  return <SignUp />;
};

export default AdminPanel;
