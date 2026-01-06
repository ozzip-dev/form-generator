import SectionHeader from "@/components/shared/SectionHeader";
import FormTemplateTrigger from "./FormTemplateTrigger";

const formsTemplates = ["favourite-color", "membership"];

const FormsTemplatesList = () => {
  return (
    <>
      <SectionHeader message="Przykładowe formularze" />
      <div className="flex">
        {formsTemplates.map((templateName, idx) => {
          return (
            <div className="size-fit mr-2" key={idx}>
              <FormTemplateTrigger templateName={templateName} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FormsTemplatesList;
