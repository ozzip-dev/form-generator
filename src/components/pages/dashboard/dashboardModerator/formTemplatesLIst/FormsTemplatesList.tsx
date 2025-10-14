import FormTemplateLink from "./FormTemplateLink";

const formsTemplates = ["favourite-color", "membership"];

const FormsTemplatesList = () => {
  return (
    <>
      <div>przykładowe szablony</div>
      {formsTemplates.map((templateName, idx) => {
        return <FormTemplateLink templateName={templateName} key={idx} />;
      })}
    </>
  );
};

export default FormsTemplatesList;
