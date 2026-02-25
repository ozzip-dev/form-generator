import SectionHeader from "@/components/shared/SectionHeader";
import FormTemplateTrigger from "./FormTemplateTrigger";
import { getFormTemplates } from "@/services/form-service";
import { TemplateFormId } from "@/models/Form";

const FormsTemplatesList = async () => {
  const templateForms = await getFormTemplates();

  const sortOrder = Object.values(TemplateFormId);

  const sortedTemplateForms = [...templateForms].sort(
    (a, b) =>
      sortOrder.indexOf(a.id as TemplateFormId) -
      sortOrder.indexOf(b.id as TemplateFormId),
  );
  const titles = [
    "Ankieta pracownicza",
    "Wybory SIP",
    "Referendum strajkowe",
    "Wybory władz",
  ];

  return (
    <>
      <SectionHeader message="Wykorzystaj wzory przykładowych formularzy" />
      <div className="flex flex-wrap justify-center gap-4 md:justify-start">
        {sortedTemplateForms
          .filter(
            ({ id, templateTitle }) => id && templateTitle,
          ) /* filter out invalid records */
          .map(({ id, templateTitle }, idx) => {
            return (
              <div
                className="flex h-fit w-[13rem] flex-col justify-center text-sm"
                key={idx}
              >
                <FormTemplateTrigger
                  id={id as string}
                  title={templateTitle as string}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default FormsTemplatesList;
