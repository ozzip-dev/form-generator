import { NavMenu } from "@/components/shared/nav-menu";
import { NavMenuLink } from "@/types/shared";

type Props = {
  formId: string;
};

const CreateFormMenu = ({ formId }: Props) => {
  const dataNavLinks: NavMenuLink[] = [
    { text: "Edycja", link: `/create-form/${formId}/edit` },
    { text: "Podgląd", link: `/create-form/${formId}/preview` },
    { text: "Wyniki", link: `/create-form/${formId}/results/summary` },
    { text: "Kontakty organizacji", link: `/create-form/${formId}/contacts` },
  ];

  return <NavMenu links={dataNavLinks} />;
};

export default CreateFormMenu;
