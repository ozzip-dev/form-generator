import SectionHeader from "@/components/shared/SectionHeader";
import FormTemplateTrigger from "./FormTemplateTrigger";
import { getFormTemplates } from "@/services/form-service";
import { TemplateFormId } from "@/lib/mongo/models";

const FormsTemplatesList = async () => {
  const templateForms = await getFormTemplates();

  const sortOrder = Object.values(TemplateFormId);

  const sortedTemplateForms = [...templateForms].sort(
    (a, b) =>
      sortOrder.indexOf(a.id as TemplateFormId) -
      sortOrder.indexOf(b.id as TemplateFormId),
  );

  return (
    <>
      <SectionHeader message="Wykorzystaj wzory przykładowych formularzy" />
      <div className="flex flex-wrap justify-center gap-4 md:justify-start">
        {sortedTemplateForms
          .filter(
            ({ _id, id, templateTitle }) => _id && id && templateTitle,
          ) /* filter out invalid records */
          .map(({ _id, id, templateTitle }, idx) => {
            return (
              <div
                className="flex flex-col items-center justify-center gap-x-4 text-sm"
                key={idx}
              >
                <FormTemplateTrigger
                  _id={_id?.toString() as string}
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
