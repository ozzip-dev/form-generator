import { NavMenu } from "@/components/shared/nav-menu";
import { NavMenuLink } from "@/types/shared";

type Props = {
  formId: string;
};

const ResultsNavMenu = ({ formId }: Props) => {
  const resultsNavLinks: NavMenuLink[] = [
    { text: "Tabela", link: `/forms/${formId}/results/table` },
    { text: "Szczegóły", link: `/forms/${formId}/results/details` },
  ];

  return (
    <div className="container">
      <NavMenu links={resultsNavLinks} level="sub" />
    </div>
  );
};

export default ResultsNavMenu;
