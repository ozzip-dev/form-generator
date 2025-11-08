"use client";

import ButtonLink from "@/components/ui/buttons/ButtonLink";
import { usePathname } from "next/navigation";

const dataNavLinks = [
  { text: "Formularze", link: "/dashboard-moderator" },
  { text: "Protokoły", link: "/protocols" },
  { text: "Forum", link: "/forum" },
  { text: "Ustawienia", link: "/user-settings" },
];

const DashboardMenu = () => {
  const pathname = usePathname();

  return (
    <ul className="flex items-center p-4 ">
      {dataNavLinks.map(({ text, link }) => {
        const isActive =
          pathname === link || pathname.startsWith("create-form" + "/");

        return (
          <li
            key={text}
            className={`me-1 pb-1 ${
              isActive
                ? "border-b-2 border-blue-500"
                : "border-b-2 border-transparent"
            }`}
          >
            <ButtonLink message={text} link={link} />
          </li>
        );
      })}
    </ul>
  );
};

export default DashboardMenu;
