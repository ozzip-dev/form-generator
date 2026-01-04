"use client";

import { NavMenu } from "@/components/shared/nav-menu";
import { useUser } from "@/context/UserContextProvider";
import { isModerator } from "@/lib/utils";
import { NavMenuLink } from "@/types/shared";
import { use } from "react";

const dashboardLink = { text: "Strona główna", link: "/dashboard" };

const moderatorNavLinks: NavMenuLink[] = [
  dashboardLink,
  { text: "Formularze", link: "/forms/list" },
  { text: "Protokoły", link: "/protocols/add" },
  { text: "Forum", link: "/forum" },
  { text: "Ustawienia", link: "/user-settings" },
];

const adminNavLinks: NavMenuLink[] = [
  dashboardLink,
  { text: "Nowy użytkownik", link: "/create-user" },
];

const DashboardMenu = () => {
  const { userPromise } = useUser();
  const user = use(userPromise);

  if (!user) return;

  const links = isModerator(user) ? moderatorNavLinks : adminNavLinks;

  return <NavMenu links={links} depth={1} />;
};

export default DashboardMenu;
