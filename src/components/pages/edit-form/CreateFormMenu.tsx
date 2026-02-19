import { NavMenu } from "@/components/shared/nav-menu";
import { isActive } from "@/helpers/formHelpers";
import { getFormById } from "@/services/form-service";
import { NavMenuLink } from "@/types/shared";

type Props = {
  formId: string;
};

const CreateFormMenu = async ({ formId }: Props) => {
  const form = await getFormById(formId);
  const isFormActive = isActive(form);

  const dataNavLinks: NavMenuLink[] = [
    { text: "Lista", link: `/forms` },
    { text: "Edycja", link: `/forms/${formId}/edit` },
    { text: "Podgląd", link: `/forms/${formId}/preview`, sameTab: false },
    { text: "Kontakty", link: `/forms/${formId}/contacts`, sameTab: false },
  ];

  const resultsLink: NavMenuLink = {
    text: "Wyniki",
    link: `/forms/${formId}/results/details`,
  };

  const visibleLinks: NavMenuLink[] = isFormActive
    ? [...dataNavLinks, resultsLink]
    : dataNavLinks;

  return (
    <div className="py-8">
      <NavMenu links={visibleLinks} icon="edit-form" depth={3} level="sub" />
    </div>
  );
};

export default CreateFormMenu;
