import { ButtonLink } from "@/components/shared";
import { getFormTemplates } from "@/services/form-service";
import Image from "next/image";
import SectionHeader from "../SectionHeader";
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
              <div className="" key={idx}>
                <div className="relative mx-auto mb-6 flex items-center justify-center rounded-sm text-font_dark">
                  <Image
                    src={`/images/${id ? templateImages[id] : "survey"}.svg`}
                    alt=""
                    width={300}
                    height={250}
                    className="h-auto w-[300px]"
                  />

                  <div className="absolute inset-0 mt-auto flex items-end justify-center text-lg">
                    <p className="h-[30%] px-4 text-center leading-8">
                      {templateTitle}
                    </p>
                  </div>
                </div>

                {!!_id && (
                  <ButtonLink
                    target="_blank"
                    message="Zobacz"
                    link={`/${_id}`}
                    variant="primary-rounded"
                    className="mx-auto my-12 w-fit !border-white !bg-white !text-font_dark hover:!border-font_dark hover:!bg-font_dark hover:!text-white"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FormTemplates;
