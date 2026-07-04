import { SectionHeader } from "@/components/shared";
import FormTemplateTrigger from "./FormTemplateTrigger";
import { getFormTemplates } from "@/services/form-service";
import { TemplateFormId } from "@/lib/mongo/models";

const FormsTemplatesList = async () => {
  const templateForms = await getFormTemplates();

  return (
    <>
      <SectionHeader message="Wykorzystaj wzory przykładowych formularzy" />
      <ul className="flex flex-wrap justify-center gap-4 md:justify-start">
        {templateForms
          .filter(
            ({ _id, id, templateTitle }) => _id && id && templateTitle,
          ) /* filter out invalid records */
          .map(({ _id, id, templateTitle }, idx) => {
            return (
              <li
                className="flex flex-col items-center justify-center gap-x-4 text-sm"
                key={idx}
              >
                <FormTemplateTrigger
                  _id={_id?.toString() as string}
                  id={id as string}
                  title={templateTitle as string}
                />
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default FormsTemplatesList;
