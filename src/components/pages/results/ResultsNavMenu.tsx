import { ProtocolMenuItem } from "@/types/protocol";
import MenuLink from "../../shared/MenuLink";

type Props = {
  formId: string;
};

const ResultsNavMenu = ({ formId }: Props) => {
  const resultsNavLinks: ProtocolMenuItem[] = [
    { text: "Podsumowanie", link: `/create-form/${formId}/results/summary` },
    { text: "Tabela", link: `/create-form/${formId}/results/table` },
  ];

  return (
    <div>
      <ul className="flex items-center justify-center">
        {resultsNavLinks.map(({ text, link }, idx) => (
          <MenuLink key={idx} {...{ text, link, sameTab: true }} />
        ))}
      </ul>
    </div>
  );
};

export default ResultsNavMenu;
