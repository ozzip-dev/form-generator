import { ButtonLink } from "@/components/shared";
import { getFormTemplates } from "@/services/form-service";
import Image from "next/image";
import SectionHeader from "../SectionHeader";
import { TemplateFormId } from "@/lib/mongo/models";

const FormTemplates = async () => {
  const templateForms = await getFormTemplates();

  // Gdy wszystkie będą gotowe, trzymać się konwencji, usunąć i po id
  const templateImages: Record<TemplateFormId, string> = {
    [TemplateFormId.SURVEY]: "survey",
    [TemplateFormId.SIP]: "sip",
    [TemplateFormId.STRIKE]: "strike",
    [TemplateFormId.ELECTIONS]: "sip", // "elections",
    [TemplateFormId.MEETING]: "sip", //"meeting",
    [TemplateFormId.TRAVEL]: "sip", // "travel",
    [TemplateFormId.LEAFLETING]: "leafleting",
  };

  return (
    <section className="bg-font_dark text-white">
      <div className="container pb-20 pt-16">
        <SectionHeader
          header="Gotowe szablony formularzy"
          subheader="Wybierz gotowy formularz i dostosuj go do swojej organizacji."
        />

        <div className="mt-16 grid grid-cols-2 gap-10 sm:grid-cols-4 sm:justify-center">
          {templateForms.map(({ _id, id, templateTitle }, idx) => {
            return (
              <div className="" key={idx}>
                <div className="relative mx-auto mb-6 flex items-center justify-center rounded-sm text-font_dark">
                  <Image
                    src={`/images/${templateImages[id]}.svg`}
                    alt=""
                    width={0}
                    height={0}
                    className="h-auto w-[300px]"
                  />

                  <div className="sm:text-md absolute inset-0 mt-auto flex items-end justify-center text-lg md:text-base lg:text-lg">
                    <p className="h-1/3 text-center">{templateTitle}</p>
                  </div>
                </div>

                <ButtonLink
                  target="_blank"
                  message="Zobacz"
                  link={`/${_id}`}
                  variant="primary-rounded"
                  className="mx-auto my-12 w-fit !border-white !bg-white !text-font_dark hover:!border-font_dark hover:!bg-font_dark hover:!text-white"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FormTemplates;
