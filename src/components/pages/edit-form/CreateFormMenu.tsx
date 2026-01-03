import MenuLink from "../../shared/MenuLink";

type Props = {
  formId: string;
};

const CreateFormMenu = ({ formId }: Props) => {
  const dataNavLinks = [
    { text: "Edycja", link: `/create-form/${formId}/edit` },
    { text: "Podgląd", link: `/create-form/${formId}/preview` },
    { text: "Wyniki", link: `/create-form/${formId}/results/summary` },
    { text: "Kontakty organizacji", link: `/create-form/${formId}/contacts` },
  ];

  return (
    <ul className="flex items-center justify-center gap-4 sticky top-0 bg-white z-10 py-10">
      {dataNavLinks.map(({ text, link }) => (
        <MenuLink key={text} text={text} link={link} />
      ))}
    </ul>
  );
};

export default CreateFormMenu;
