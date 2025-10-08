import ButtonLink from "@/components/ui/buttons/ButtonLink";

const dataNavLinks = [
  { text: "Nowy formulaż", link: "/create-form/new-form" },
  { text: "Wyniki", link: "/create-form/results" },
];

const CreateFormMenu = () => {
  return (
    <div>
      <ul className="flex items-center justify-center">
        {dataNavLinks.map(({ text, link }) => {
          return (
            <li key={text} className="me-1">
              <ButtonLink text={text} link={link} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CreateFormMenu;
