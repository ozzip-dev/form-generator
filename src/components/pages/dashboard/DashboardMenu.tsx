"use client";

import AppTopBar from "@/components/pages/shared/AppTopBar";
import { useUser } from "@/context/UserContextProvider";
import { isModerator } from "@/lib/utils";
import { NavMenuLink } from "@/types/shared";
import { use } from "react";

const dashboardLink = { text: "Strona główna", link: "/dashboard" };

const moderatorNavLinks: NavMenuLink[] = [
  { text: "Formularze", link: "/forms/list" },
  { text: "Protokoły", link: "/protocols/list" },
  { text: "Forum", link: "/forum/list" },
  { text: "Ustawienia", link: "/settings/user-settings" },
];

const adminNavLinks: NavMenuLink[] = [
  dashboardLink,
  { text: "Dodaj użytkownika", link: "/create-user" },
];

const DashboardMenu = () => {
  const { userPromise } = useUser();
  const user = use(userPromise);
  if (!user) return;

  const links = isModerator(user) ? moderatorNavLinks : adminNavLinks;

  return <AppTopBar isPublic={false} links={links} user={user} />;
};
export default DashboardMenu;
