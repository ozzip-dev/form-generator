import { NavMenu } from "@/components/shared/nav-menu";
import { NavMenuLink } from "@/types/shared";

type Props = {
  formId: string;
};

const ResultsNavMenu = ({ formId }: Props) => {
  const resultsNavLinks: NavMenuLink[] = [
    { text: "Tabela", link: `/forms/${formId}/results/table` },
    { text: "Podsumowamie", link: `/forms/${formId}/results/details` },
  ];

  return (
    <div className="container pb-2">
      <NavMenu links={resultsNavLinks} level="sub" />
    </div>
  );
};

export default ResultsNavMenu;
