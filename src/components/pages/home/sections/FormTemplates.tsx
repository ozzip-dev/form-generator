import { getFormTemplates } from "@/services/form-service";
import SectionHeader from "../SectionHeader";
import FormTemplate from "../FormTemplate";
import { TemplateFormId } from "@/lib/mongo/models";
import { Form } from "@/types/form";
import CardSmall from "@/components/shared/cards/CardSmall";

type FormTemplateItem = {
  _id?: Form["_id"];
  id?: TemplateFormId;
  templateTitle: string;
  subtitle: string;
  icon: string;
};

const templateDetails: Record<string, { subtitle: string; icon: string }> = {
  elections: {
    subtitle: "Wybory",
    icon: "landmark",
  },
  sip: {
    subtitle: "Wybory",
    icon: "users",
  },
  strike: {
    subtitle: "Głosowanie",
    icon: "checkbox",
  },
  meeting: {
    subtitle: "Organizacja",
    icon: "calendar",
  },
  travel: {
    subtitle: "Organizacja",
    icon: "pin",
  },
  survey: {
    subtitle: "Opinia",
    icon: "clipboard",
  },
  leafleting: {
    subtitle: "Organizacja",
    icon: "megaphone",
  },
};

const FormTemplates = async () => {
  const templateForms = await getFormTemplates();

  const pageItems: FormTemplateItem[] = [
    ...templateForms.map(({ _id, id, templateTitle }) => {
      console.log("", id);
      const details = templateDetails[String(id)] ?? {
        subtitle: "Dostosuj formularz do potrzeb swojej organizacji.",
        icon: "mdi:file-document-outline",
      };

      return {
        _id,
        id: id as TemplateFormId,
        templateTitle: templateTitle ?? "Formularz bez nazwy",
        ...details,
      };
    }),
    {
      templateTitle: "Twój własny formularz",
      subtitle: "Od zera",
      icon: "plus-solid-full",
    },
  ];

  return (
    <section className="bg-bg_dark" id="templates">
      <div className="container py-20">
        <SectionHeader
          title="Gotowe szablony formularzy"
          header="Zacznij od gotowego szablonu"
          subheader="Wybierz swoją sytuację i dostosuj formularz do organizacji."
        />

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pageItems.map(({ _id, id, templateTitle, subtitle, icon }, idx) => {
            return (
              <li key={idx} className="h-full">
                <FormTemplate
                  _id={_id?.toString()}
                  id={id}
                  templateTitle={templateTitle}
                  subtitle={subtitle}
                  icon={icon}
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
