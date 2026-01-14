import { NavMenu } from "@/components/shared/nav-menu";
import { NavMenuLink } from "@/types/shared";

type Props = {
  formId: string;
};

const CreateFormMenu = ({ formId }: Props) => {
  const dataNavLinks: NavMenuLink[] = [
    { text: "Lista", link: `/forms` },
    { text: "Edycja", link: `/forms/${formId}/edit` },
    { text: "Podgląd", link: `/forms/${formId}/preview` },
    { text: "Wyniki", link: `/forms/${formId}/results/table` },
    { text: "Kontakty", link: `/forms/${formId}/contacts` },
  ];

  return (
    <div className="py-8 ">
      <NavMenu links={dataNavLinks} icon="edit-form" depth={3} level="sub" />
    </div>
  );
};

export default CreateFormMenu;
