import { ButtonLink } from "@/components/shared";
import { getFormTemplates } from "@/services/form-service";
import Image from "next/image";
import SectionHeader from "../SectionHeader";

const FormTemplates = async () => {
  const templateForms = await getFormTemplates();

  const images = [
    "elections",
    "flayers",
    "yo",
    "yyy",
    "elections",
    "flayers",
    "yo",
    "yyy",
  ];

  return (
    <section className="bg-font_dark text-white">
      <div className="container pb-20 pt-16">
        <SectionHeader
          header="Gotowe szablony formularzy"
          subheader="Wybierz gotowy formularz i dostosuj go do swojej organizacji."
        />

        <div className="mt-16 gap-10 sm:flex sm:flex-wrap sm:justify-center">
          {templateForms.map(({ _id, templateTitle }, idx) => {
            return (
              <div className="" key={idx}>
                <div className="relative mx-auto mb-6 flex items-center justify-center rounded-sm text-font_dark">
                  <Image
                    src={`/images/${images[idx]}.svg`}
                    alt=""
                    width={0}
                    height={0}
                    className="h-auto w-[150px]"
                  />

                  <div className="absolute inset-0 mt-auto flex items-end justify-center text-sm">
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
