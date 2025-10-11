"use client";

import ButtonLink from "@/components/ui/buttons/ButtonLink";
import { usePathname } from "next/navigation";

type Props = {
  formId: string;
};

const CreateFormMenu = (props: Props) => {
  const pathname = usePathname();

  const dataNavLinks = [
    { text: "Formularz", link: `/create-form/${props.formId}/edit` },
    { text: "Wyniki", link: `/create-form/${props.formId}/results` },
  ];

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
