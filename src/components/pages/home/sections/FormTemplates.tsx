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

        <ul className="mt-16 grid list-none grid-cols-2 gap-10 sm:justify-center lg:grid-cols-4">
          {pageItems.map(({ _id, id, templateTitle }, idx) => {
            return (
              <li key={idx}>
                <FormTemplate
                  _id={_id?.toString()}
                  id={id}
                  templateTitle={templateTitle}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FormTemplates;
