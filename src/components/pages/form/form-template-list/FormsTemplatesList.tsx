import { SectionHeader } from "@/components/shared";
import { getFormTemplates } from "@/services/form-service";
import { templateDetails } from "../../home/sections/FormTemplates";
import FormTemplateTrigger from "./FormTemplateTrigger";

const FormsTemplatesList = async () => {
  const templateForms = await getFormTemplates();

  return (
    <>
      <SectionHeader
        message="Wzory formularzy"
        subheader="Zacznij od gotowego szablonu. Zostanie skopiowany jako nowy szkic."
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {templateForms.map(({ _id, id, templateTitle }) => {
          return (
            <li key={id}>
              <FormTemplateTrigger
                _id={_id?.toString() as string}
                id={id as string}
                title={templateTitle as string}
                iconName={templateDetails[String(id)].icon}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default FormsTemplatesList;
