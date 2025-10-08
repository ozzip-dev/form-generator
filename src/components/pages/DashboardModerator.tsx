"use client";

import { IUser } from "@/types/user";
import Link from "next/link";
import ButtonLink from "../ui/buttons/ButtonLink";

const dataNavLinks = [
  { text: "Utwórz formularz", link: "/create-form" },
  { text: "Panel", link: "/dashboard" },
];

type Props = {
  user: IUser;
};

const DashboardModerator = (props: Props) => {
  return <div className="p-4">panel moderator</div>;
};

export default DashboardModerator;
