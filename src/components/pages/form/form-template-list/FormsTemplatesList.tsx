import SectionHeader from "@/components/shared/SectionHeader";
import FormTemplateTrigger from "./FormTemplateTrigger";
import { getFormTemplates } from "@/services/form-service";

const FormsTemplatesList = async () => {
  const templateForms = await getFormTemplates();

  return (
    <>
      <SectionHeader message="Przykładowe formularze" />
      <div className="flex flex-wrap justify-center md:justify-start gap-4">
        {templateForms
          .filter(
            ({ id, title }) => id && title,
          ) /* filter out invalid records */
          .map(({ id, title }, idx) => {
            return (
              <div className="size-fit mr-2" key={idx}>
                <FormTemplateTrigger
                  id={id as string}
                  title={title as string}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default FormsTemplatesList;
