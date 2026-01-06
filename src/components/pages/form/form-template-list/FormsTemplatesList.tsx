import SectionHeader from "@/components/shared/SectionHeader";
import FormTemplateTrigger from "./FormTemplateTrigger";

const formsTemplates = ["Favourite-color", "Membership"];

const FormsTemplatesList = () => {
  return (
    <>
      <SectionHeader message="Przykładowe formularze" />
      <div className="flex flex-wrap justify-center md:justify-start gap-4">
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
