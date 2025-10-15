import FormTemplateLink from "./FormTemplateLink";

const formsTemplates = ["favourite-color", "membership"];

const FormsTemplatesList = () => {
  return (
    <>
      <div>przykładowe formularze</div>
      <div className="flex">
        {formsTemplates.map((templateName) => {
          return (
            <div className="size-fit mr-2">
              <FormTemplateLink
                templateName={templateName}
                key={templateName}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FormsTemplatesList;
