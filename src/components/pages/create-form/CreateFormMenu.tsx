"use client";

import ButtonLink from "@/components/ui/buttons/ButtonLink";
import { usePathname } from "next/navigation";

const dataNavLinks = [
  { text: "Nowy formularz", link: "/create-form" },
  { text: "Wyniki", link: "/create-form/results" },
];

const CreateFormMenu = () => {
  const pathname = usePathname();

  return (
    <div>
      <ul className="flex items-center justify-center">
        {dataNavLinks.map(({ text, link }) => {
          const isActive = pathname === link;

          return (
            <li
              key={text}
              className={`me-1 pb-1 ${
                isActive
                  ? "border-b-2 border-blue-500"
                  : "border-b-2 border-transparent"
              }`}
            >
              <ButtonLink text={text} link={link} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CreateFormMenu;
