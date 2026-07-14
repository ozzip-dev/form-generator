"use client";

import { BackToHomeLink, ButtonLink } from "@/components/shared";
import { NavMenu } from "@/components/shared";
import { NavMenuLink } from "@/types/shared";
import { UserSerialized } from "@/types/user";
import UserProfileButton from "./UserProfileButton";

type Props = {
  isPublic: boolean;
  links: NavMenuLink[];
  user: Partial<UserSerialized> | null;
};

export default function AppTopBar({ isPublic, links, user }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-6 lg:gap-8">
          <BackToHomeLink isDark={isPublic} />

          <div className="hidden lg:block">
            <NavMenu
              links={links}
              depth={1}
              textColor={isPublic ? "var(--color-font_dark)" : "white"}
            />
          </div>
        </div>
      </div>

      {!user && (
        <div className="ml-auto hidden shrink-0 items-center gap-3 lg:flex lg:gap-6 xl:gap-10">
          <ButtonLink
            message="Zarejestruj organizację"
            link="/admin-contact"
            variant="primary-rounded"
          />

          <ButtonLink
            message="Zaloguj"
            link="/login"
            variant="primary-rounded"
          />
        </div>
      )}

      <UserProfileButton isPublic={isPublic} userName={user?.name} />
    </div>
  );
}
