"use client";

import { AppTopBar } from "@/components/shared";
import { useUser } from "@/context/UserContextProvider";
import { adminNavLinks, userProfileLinks } from "@/helpers/menuLinks";
import { isModerator } from "@/lib/utils";
import { use } from "react";

const DashboardMenu = () => {
  const { userPromise } = useUser();
  const user = use(userPromise);
  if (!user) return;

  const links = isModerator(user) ? userProfileLinks : adminNavLinks;

  return <AppTopBar isPublic={false} links={links} user={user} />;
};
export default DashboardMenu;
