import { FormState } from "@/types/form";

type Props = {
  title?: string;
  isTemplate: boolean;
};

const CreatedFormTemplateHeader = ({ title = "", isTemplate }: Props) => {
  const formStateHeader = isTemplate
    ? "Szkic formularza:"
    : "Podgląd formularza:";

  return (
    <div className="fixed bottom-0 z-30 w-full bg-accent_opacity py-4 text-center">
      <p className="font-bold text-white">
        {formStateHeader} <br /> {title}
      </p>
    </div>
  );
};

export default CreatedFormTemplateHeader;
