"use client";

import { Button, Icon } from "@/components/shared";
import { NavMenu } from "@/components/shared/nav-menu";
import { useUser } from "@/context/UserContextProvider";
import { isModerator } from "@/lib/utils";
import { NavMenuLink } from "@/types/shared";
import { use, useState } from "react";

const dashboardLink = { text: "Strona główna", link: "/dashboard" };

const moderatorNavLinks: NavMenuLink[] = [
  // dashboardLink, // TODO: zostawiam dla admina, przemyśleć i ew. zmienić
  { text: "Formularze", link: "/forms/list" },
  { text: "Protokoły", link: "/protocols/add" },
  { text: "Forum", link: "/forum/list" },
  { text: "Ustawienia", link: "/settings/user-settings" },
];

const adminNavLinks: NavMenuLink[] = [
  dashboardLink,
  { text: "Dodaj użytkownika", link: "/create-user" },
];

const DashboardMenu = () => {
  const { userPromise } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = use(userPromise);
  if (!user) return;

  const links = isModerator(user) ? moderatorNavLinks : adminNavLinks;

  return (
    <div className="flex items-center gap-4">
      <Button
        type="button"
        className="lg:hidden"
        icon={
          isMenuOpen ? (
            <Icon color="white" icon="xmark" size={20} />
          ) : (
            <Icon color="white" icon="hamburger" size={20} />
          )
        }
        onClickAction={() => setIsMenuOpen((prev) => !prev)}
        variant="ghost"
        ariaLabel={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
      />

      <div
        className={`fixed left-0 top-20 z-40 h-full w-4/5 max-w-xs transform bg-accent transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} `}
      >
        <div className="px-6 pt-20">
          <NavMenu links={links} depth={1} variant="mobile" />
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 top-24 z-20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div className="hidden lg:block">
        <NavMenu links={links} depth={1} />
      </div>
    </div>
  );
};
export default DashboardMenu;
