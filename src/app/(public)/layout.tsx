"use client";

import Link from "next/link";
import Image from "next/image";
import DashboardMenu from "@/components/pages/dashboard/DashboardMenu";
import { useState } from "react";
import { Button, ButtonLink, Icon } from "@/components/shared";
import { NavMenu } from "@/components/shared/nav-menu";
import Header from "@/components/shared/Header";

const links = [
  { text: "Instrukcja Formularze", link: "/forms-doc" },
  { text: "Instrukcja Protokoły", link: "/protocols-doc" },
  { text: "Rejestracja", link: "/admin-contact" },
];

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="h-full overflow-y-auto">
      <Header className="sticky top-0 bg-white">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              className="text-white lg:hidden"
              icon={
                isMenuOpen ? (
                  <Icon color="black" icon="xmark" size={20} />
                ) : (
                  <Icon color="black" icon="hamburger" size={20} />
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
            <ButtonLink message="Formy Pracy" link="/" className="" />{" "}
            <div className="hidden lg:block">
              <NavMenu links={links} depth={1} />
            </div>
          </div>
          <ButtonLink message="Logowanie" link="/login" className="ml-auto" />
        </div>
      </Header>
      <main className="">{children}</main>{" "}
      <footer className="bg-font_dark">
        <div className="container py-20 text-white">
          <div>
            <p>OZZ Inicjatywa Pracownicza</p>
            <p>Komisja Krajowa</p>
            <p>ul. Kościelna 4/1a, 60-538</p>
            <p>REGON:634611023</p>
            <p>NIP:779-22-38-665</p>
          </div>
        </div>{" "}
        <div className="items-center justify-center bg-white p-2 sm:flex">
          <Image
            src="/images/UELogos.webp"
            alt="Loga"
            width={400}
            height={200}
            placeholder="blur"
            blurDataURL="/images/placeholder.jpg"
            loading="lazy"
          />
          <Image
            src="/images/TransferHubLogo.webp"
            alt="TransferHub logo"
            width={100}
            height={25}
            className="xs:w-auto m-auto h-[25px] pl-2 sm:m-0 sm:border-l-2 sm:border-zinc-400"
            placeholder="blur"
            blurDataURL="/images/placeholder.jpg"
            loading="lazy"
          />
        </div>
      </footer>
    </div>
  );
}
