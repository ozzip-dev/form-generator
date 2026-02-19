import { NavMenu } from "@/components/shared/nav-menu";
import { NavMenuLink } from "@/types/shared";

type Props = {
  formId: string;
};

const ResultsNavMenu = ({ formId }: Props) => {
  const resultsNavLinks: NavMenuLink[] = [
    { text: "Podsumowanie", link: `/forms/${formId}/results/details` },
    { text: "Tabela", link: `/forms/${formId}/results/table` },
  ];

  return (
    <div className="pb-2">
      <NavMenu links={resultsNavLinks} level="sub" />
    </div>
  );
};

export default ResultsNavMenu;
