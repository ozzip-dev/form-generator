import MenuLink from "./MenuLink";

const ProtocolsMenu = () => {
  const dataNavLinks = [
    { text: "Dodaj protokół", link: `/protocols` },
    { text: "Lista protokołów", link: `/protocols/protocols-list` },
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

export default ProtocolsMenu;
