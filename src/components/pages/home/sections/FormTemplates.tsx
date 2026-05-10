import { ButtonLink } from "@/components/shared";
import { getFormTemplates } from "@/services/form-service";

const FormTemplates = async () => {
  const templateForms = await getFormTemplates();

  return (
    <section className="bg-font_light">
      <div className="container pb-20 pt-16">
        <div className="mx-auto w-4/5">
          <h2 className="text-center text-lg">Gotowe szablony formularzy</h2>
          <p className="mt-4 text-center">
            Gotowe szablony formularzy Zacznij od razu bez budowania od zera.
            Wybierz gotowy formularz i dostosuj go do swojej organizacji.
          </p>{" "}
        </div>

        <div className="mt-16 gap-10 sm:flex sm:flex-wrap sm:justify-center">
          {templateForms.map(({ _id, templateTitle }, idx) => (
            <div className="sm:flex-1" key={idx}>
              <div className="mx-auto mb-6 flex h-[120px] w-[120px] items-center justify-center rounded-sm bg-slate-500 text-white">
                <p className="text-center">{templateTitle}</p>
              </div>
              <ButtonLink
                target="_blank"
                message="Zobacz"
                link={`/${_id}`}
                variant="primary-rounded"
                className="mx-auto my-12 w-fit !border-error !bg-error !text-white hover:!border-white hover:!bg-white hover:!text-error"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormTemplates;
