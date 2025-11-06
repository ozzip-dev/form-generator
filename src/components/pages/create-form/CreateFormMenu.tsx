import MenuLink from "../protocols/MenuLink";

type Props = {
  formId: string;
};

const CreateFormMenu = ({ formId }: Props) => {
  const dataNavLinks = [
    { text: "Formularz", link: `/create-form/${formId}/edit` },
    { text: "Podgląd", link: `/create-form/${formId}/preview` },
    { text: "Wyniki", link: `/create-form/${formId}/results` },
    { text: "Kontakty organizacji", link: `/create-form/${formId}/contacts` },
  ];

  return (
    <div>
      <ul className="flex items-center justify-center">
        {dataNavLinks.map(({ text, link }) => (
          <MenuLink key={text} text={text} link={link} />
        ))}
      </ul>
    </div>
  );
};

export default CreateFormMenu;
