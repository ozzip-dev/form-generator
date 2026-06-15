"use client";

import AppTopBar from "@/components/pages/shared/AppTopBar";
import { userProfileLinks } from "@/components/pages/shared/userProfileLinks";
import { useUser } from "@/context/UserContextProvider";
import { isModerator } from "@/lib/utils";
import { NavMenuLink } from "@/types/shared";
import { use } from "react";

const dashboardLink = { text: "Strona główna", link: "/dashboard" };

const adminNavLinks: NavMenuLink[] = [
  dashboardLink,
  { text: "Dodaj użytkownika", link: "/create-user" },
];

const DashboardMenu = () => {
  const { userPromise } = useUser();
  const user = use(userPromise);
  if (!user) return;

  const links = isModerator(user) ? userProfileLinks : adminNavLinks;

  return <AppTopBar isPublic={false} links={links} user={user} />;
};
export default DashboardMenu;
