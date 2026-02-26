import { NavMenu } from "@/components/shared/nav-menu";
import { isActive, isUserAuthor } from "@/helpers/formHelpers";
import { getFormById } from "@/services/form-service";
import { requireUser } from "@/services/user-service";
import { NavMenuLink } from "@/types/shared";

type Props = {
  formId: string;
};

const CreateFormMenu = async ({ formId }: Props) => {
  const form = await getFormById(formId);
  const isFormActive = isActive(form);

  const user = await requireUser();
  const isAuthor = isUserAuthor(form, user.id);

  const dataNavLinks: NavMenuLink[] = [
    { text: "Lista", link: `/forms`, isVisible: true },
    { text: "Edycja", link: `/forms/${formId}/edit`, isVisible: isAuthor },
    {
      text: "Podgląd",
      link: `/forms/${formId}/preview`,
      sameTab: false,
      isVisible: true,
    },
    {
      text: "Kontakty",
      link: `/forms/${formId}/contacts`,
      sameTab: false,
      isVisible: isAuthor,
    },
    {
      text: "Wyniki",
      link: `/forms/${formId}/results/details`,
      isVisible: isAuthor && isFormActive,
    },
  ];

  const visibleLinks: NavMenuLink[] = dataNavLinks.filter(
    ({ isVisible }) => isVisible,
  );

  return (
    <div className="py-8">
      <NavMenu links={visibleLinks} icon="edit-form" depth={3} level="sub" />
    </div>
  );
};

export default CreateFormMenu;
