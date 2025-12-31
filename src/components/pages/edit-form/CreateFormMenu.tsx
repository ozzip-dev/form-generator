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
    <div>
      <ul className="flex items-center justify-center gap-4">
        {dataNavLinks.map(({ text, link }) => (
          <MenuLink key={text} text={text} link={link} />
        ))}
      </ul>
    </div>
  );
};

export default CreateFormMenu;
