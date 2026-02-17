import SectionHeader from "@/components/shared/SectionHeader";
import FormTemplateTrigger from "./FormTemplateTrigger";
import { getFormTemplates } from "@/services/form-service";

const FormsTemplatesList = async () => {
  const templateForms = await getFormTemplates();

  // Taka kolejność
  const templateHeders = [
    "OUT",
    "OUT",
    "Ankieta pracownicza",
    "Wybory SIP",
    "Referendum strajkowe",
    "Wybory prezydium komisji",
  ];

  return (
    <>
      <SectionHeader message="Przykładowe formularze" />
      <div className="flex flex-wrap justify-center gap-4 md:justify-start">
        {templateForms
          .filter(
            ({ id, title }) => id && title,
          ) /* filter out invalid records */
          .map(({ id }, idx) => {
            return (
              <div
                className="flex h-fit w-[13rem] flex-col justify-center text-sm"
                key={idx}
              >
                <FormTemplateTrigger
                  id={id as string}
                  title={templateHeders[idx] as string}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default FormsTemplatesList;
