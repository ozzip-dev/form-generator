"use client";

import { NavMenu } from "@/components/shared/nav-menu";
import { useUser } from "@/context/UserContextProvider";
import { NavMenuLink } from "@/types/shared";
import { use } from "react";

const dataNavLinks: NavMenuLink[] = [
  { text: "Formularze", link: "/dashboard-moderator" },
  { text: "Protokoły", link: "/protocols/add-protocol" },
  { text: "Forum", link: "/forum" },
  { text: "Ustawienia", link: "/user-settings" },
];

const DashboardMenu = () => {
  const { userPromise } = useUser();
  const user = use(userPromise);

  if (!user || user.role === "admin") return;

  return <NavMenu links={dataNavLinks} />;
};

export default DashboardMenu;
