import { getFormTemplates } from "@/services/form-service";
import SectionHeader from "../SectionHeader";
import FormTemplate from "../FormTemplate";
import { TemplateFormId } from "@/lib/mongo/models";
import { Form } from "@/types/form";

const FormTemplates = async () => {
  const templateForms = await getFormTemplates();
  const pageItems: (Pick<Form, "_id" | "templateTitle"> & {
    id?: TemplateFormId;
  })[] = [
    ...templateForms.map(({ _id, id, templateTitle }) => ({
      _id,
      id: id as TemplateFormId,
      templateTitle,
    })),
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
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FormTemplates;
