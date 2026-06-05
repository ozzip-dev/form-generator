"use client";

import Link from "next/link";
import Image from "next/image";
import DashboardMenu from "@/components/pages/dashboard/DashboardMenu";
import { useState } from "react";
import { Button, ButtonLink, Card, Icon } from "@/components/shared";
import { NavMenu } from "@/components/shared/nav-menu";
import Header from "@/components/shared/Header";

const links = [
  { text: "Formularze", link: "/forms-doc" },
  { text: "Protokoły", link: "/protocols-doc" },
  { text: "Rejestracja", link: "/admin-contact" },
];

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <Header className="sticky top-0">
        <>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
              <Button
                type="button"
                className="text-white lg:hidden"
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
                className={`fixed left-10 top-[6.9rem] z-20 transform rounded-sm bg-white transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-[150%]"} `}
              >
                <div className="px-16 md:px-0">
                  <NavMenu links={links} depth={1} variant="mobile" />
                </div>
              </Card>
              {isMenuOpen && (
                <div
                  className="fixed inset-0 top-[6.9rem] z-10 backdrop-blur-sm lg:hidden"
                  onClick={() => setIsMenuOpen(false)}
                />
              )}
              <ButtonLink
                message="Formy Pracy"
                link="/"
                className="font-bold"
              />{" "}
              <div className="hidden lg:block">
                <NavMenu links={links} depth={2} />
              </div>
            </div>
            <ButtonLink
              message="Logowanie"
              link="/login"
              variant="primary-rounded"
              className="ml-auto !border-error !bg-error !text-white hover:!border-white hover:!bg-white hover:!text-error"
            />
          </div>
          {/* <div className="absolute bottom-0 left-0 z-10 h-7 w-full bg-white"></div> */}
        </>
      </Header>
      <main className="flex-1">{children}</main>{" "}
      <footer className="mt-auto bg-font_dark">
        <div className="container py-20 text-white">
          <div>
            <p>OZZ Inicjatywa Pracownicza</p>
            <p>Komisja Krajowa</p>
            <p>ul. Kościelna 4/1a, 60-538 Poznań</p>
            <p>REGON:634611023</p>
            <p>NIP:779-22-38-665</p>
          </div>
        </div>{" "}
        <div className="items-center justify-center bg-white p-2 md:flex">
          <Image
            src="/images/UELogos.webp"
            alt="Loga"
            width={400}
            height={200}
            placeholder="blur"
            blurDataURL="/images/placeholder.jpg"
            loading="lazy"
            className="m-auto md:m-0"
          />
          <Image
            src="/images/TransferHubLogo.webp"
            alt="TransferHub logo"
            width={100}
            height={25}
            className="m-auto h-[25px] pl-2 md:m-0 md:border-l-2 md:border-zinc-400"
            placeholder="blur"
            blurDataURL="/images/placeholder.jpg"
            loading="lazy"
          />
        </div>
      </footer>
    </div>
  );
}
