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
    <div className="mb-8 w-full bg-accent_light py-8 text-center">
      <p className="text-4xl font-bold text-black">
        {formStateHeader} {title}
      </p>
    </div>
  );
};

export default CreatedFormTemplateHeader;
