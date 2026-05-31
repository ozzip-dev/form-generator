import { getFormTemplates } from "@/services/form-service";
import SectionHeader from "../SectionHeader";
import FormTemplate from "../FormTemplate";
import { TemplateFormId } from "@/lib/mongo/models";

const FormTemplates = async () => {
  const templateForms = await getFormTemplates();

  // TODO Gdy wszystkie będą gotowe, trzymać się konwencji, usunąć i po id
  // moze inaczej niz to pageItems nizej
  const templateImages: Record<TemplateFormId, string> = {
    [TemplateFormId.SURVEY]: "survey",
    [TemplateFormId.SIP]: "sip",
    [TemplateFormId.STRIKE]: "strike",
    [TemplateFormId.ELECTIONS]: "sip", // "elections",
    [TemplateFormId.MEETING]: "sip", //"meeting",
    [TemplateFormId.TRAVEL]: "sip", // "travel",
    [TemplateFormId.LEAFLETING]: "leafleting",
  };

  const pageItems: (Form | Partial<Form>)[] = [
    ...templateForms,
    {
      templateTitle: "Twój własny formularz",
    },
  ];

  return (
    <section className="bg-font_dark text-white">
      <div className="container pb-20 pt-16">
        <SectionHeader
          header="Gotowe szablony formularzy"
          subheader="Wybierz gotowy formularz i dostosuj go do swojej organizacji."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:justify-center lg:grid-cols-4">
          {pageItems.map(({ _id, id, templateTitle }, idx) => {
            return (
              <FormTemplate
                key={idx}
                _id={_id?.toString()}
                id={id}
                templateTitle={templateTitle}
                templateImages={templateImages}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FormTemplates;
