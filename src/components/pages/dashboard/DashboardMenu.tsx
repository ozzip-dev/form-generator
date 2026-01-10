"use client";

import { Button, Icon } from "@/components/shared";
import { NavMenu } from "@/components/shared/nav-menu";
import { useUser } from "@/context/UserContextProvider";
import { isModerator } from "@/lib/utils";
import { NavMenuLink } from "@/types/shared";
import { use, useState } from "react";

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
      />

      <div
        className={`
          lg:hidden
          fixed top-20 left-0 h-full w-4/5 max-w-xs
          bg-accent z-40
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="pt-20 px-6">
          <NavMenu links={links} depth={1} variant="mobile" />
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-24 z-20 backdrop-blur-sm"
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
