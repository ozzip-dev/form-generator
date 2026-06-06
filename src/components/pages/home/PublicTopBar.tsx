"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  BackToHomeLink,
  Button,
  ButtonLink,
  Card,
  Icon,
} from "@/components/shared";
import { NavMenu } from "@/components/shared/nav-menu";
import LogoutButton from "@/components/pages/dashboard/dashboard-top-bar/LogoutButton";
import { UserSerialized } from "@/types/user";

type Props = {
  user: UserSerialized | null;
};

const links = [
  { text: "Instrukcja do formularzy", link: "/forms-doc" },
  { text: "Instrukcja do protokołów", link: "/protocols-doc" },
  { text: "Zarejestruj organizację", link: "/admin-contact" },
];

export default function PublicTopBar({ user }: Props) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActiveLink = (link: string) => pathname === link;

  return (
    <div className="bg-white py-6 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-6 lg:gap-8">
          <Button
            type="button"
            className="text-font_dark lg:hidden"
            icon={
              isMenuOpen ? (
                <Icon icon="xmark" size={20} className="bg-font_dark" />
              ) : (
                <Icon className="bg-font_dark" icon="hamburger" size={20} />
              )
            }
            onClickAction={() => setIsMenuOpen((prev) => !prev)}
            variant="ghost"
            ariaLabel={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          />
          <Card
            className={`fixed left-10 top-[8.6rem] z-20 transform rounded-sm bg-white transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-[150%]"} `}
          >
            <div className="px-16 md:px-0">
              <NavMenu links={links} depth={1} variant="mobile" />
            </div>
          </Card>
          {isMenuOpen && (
            <div
              className="fixed inset-0 top-[8.6rem] z-10 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
          <BackToHomeLink />

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8 text-font_dark xl:gap-10">
              {links.map((item) => (
                <li key={item.link}>
                  <ButtonLink
                    message={item.text}
                    link={item.link}
                    className={`text-sm ${
                      isActiveLink(item.link)
                        ? "font-bold underline decoration-[1px] underline-offset-4"
                        : "font-normal"
                    }`}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {user ? (
          <div className="ml-auto hidden shrink-0 items-center gap-6 lg:flex xl:gap-10">
            <div className="text-font_dark">
              <span className="font-semibold">{user.name}</span>
            </div>
            <LogoutButton />
          </div>
        ) : (
          <div className="ml-auto hidden shrink-0 items-center gap-6 lg:flex xl:gap-10">
            <ButtonLink
              message="Zaloguj"
              link="/login"
              variant="primary-rounded"
              className="min-w-[11.6rem] !rounded-full !border-[#cf0000] !bg-[#cf0000] px-12 py-3 text-base text-white hover:!border-accent hover:!bg-white hover:!text-[#cf0000]"
            />
          </div>
        )}

        {!user && (
          <ButtonLink
            message="Zaloguj"
            link="/login"
            variant="primary-rounded"
            className="ml-auto !rounded-full !border-[#cf0000] !bg-[#cf0000] px-8 py-2 text-white hover:!border-accent hover:!bg-white hover:!text-[#cf0000] lg:hidden"
          />
        )}
      </div>
    </div>
  );
}
