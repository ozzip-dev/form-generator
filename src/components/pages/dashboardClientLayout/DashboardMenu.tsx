import ButtonLink from "@/components/ui/buttons/ButtonLink";

const dataNavLinks = [
  { text: "Utwórz formularz", link: "/create-form" },
  { text: "Panel", link: "/dashboard" },
];

const DashboardMenu = () => {
  return (
    <div>
      <ul className="flex items-center ">
        {dataNavLinks.map(({ text, link }) => {
          return (
            <li className="me-1">
              <ButtonLink text={text} link={link} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DashboardMenu;
