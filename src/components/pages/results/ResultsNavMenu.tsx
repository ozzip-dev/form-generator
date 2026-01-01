import { NavMenu } from "@/components/shared/nav-menu";
import { NavMenuLink } from "@/types/shared";

type Props = {
  formId: string;
};

const ResultsNavMenu = ({ formId }: Props) => {
  const resultsNavLinks: NavMenuLink[] = [
    { text: "Podsumowanie", link: `/create-form/${formId}/results/summary` },
    { text: "Tabela", link: `/create-form/${formId}/results/table` },
  ];

  return <NavMenu links={resultsNavLinks} />;
};

export default ResultsNavMenu;
