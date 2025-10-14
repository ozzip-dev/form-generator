import FormTemplateLink from "./FormTemplateLink";

const formsTemplates = ["favourite-color", "membership"];

const FormsTemplatesList = () => {
  return (
    <>
      <div>przykładowe formularze</div>
      {formsTemplates.map((templateName) => {
        return (
          <FormTemplateLink templateName={templateName} key={templateName} />
        );
      })}
    </>
  );
};

export default FormsTemplatesList;
