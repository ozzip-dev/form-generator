import { getFormTemplates } from "@/services/form-service";
import SectionHeader from "../SectionHeader";
import FormTemplate from "../FormTemplate";
import { TemplateFormId } from "@/lib/mongo/models";
import { Form } from "@/types/form";
import CardSmall from "@/components/shared/cards/CardSmall";

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
    <section className="bg-bg_dark">
      <div className="container py-20">
        <SectionHeader
          title="GOTOWE SZABLONY FORMULARZY"
          header="Zacznij od gotowego szablonu"
          subheader="Wybierz swoją sytuację i dostosuj formularz do organizacji."
        />

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pageItems.map(({ _id, id, templateTitle }, idx) => {
            return (
              <li key={idx} className="h-full">
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
