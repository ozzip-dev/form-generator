import ButtonLink from "@/components/ui/buttons/ButtonLink";

const dataNavLinks = [
  { text: "Panel", link: "/dashboard" },
  { text: "Utwórz formularz", link: "/create-form" },
  { text: "Protokoły", link: "/protocols" },
  { text: "Forum", link: "/forum" },
  { text: "Ustawienia", link: "/user-settings" },
];

const DashboardMenu = () => {
  return (
    <div>
      <ul className="flex items-center ">
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

export default DashboardMenu;
