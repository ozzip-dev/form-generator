import { getSerializedFormList } from "@/services/form-service";
import FormLink from "./FormLink";
import { SuspenseErrorBoundary, SectionHeader } from "@/components/shared";
import FormTrigger from "../FormTrigger";
import { maxFormCount } from "@/helpers/formHelpers";

const FormsLIst = async () => {
  const forms = await getSerializedFormList();
  const formsRatio = (forms.length / maxFormCount) * 100;
  const freePlaces = forms.length - maxFormCount;

  return (
    <>
      <div className="mb-8 items-center md:flex md:justify-between">
        <div>
          <SectionHeader
            message="Twoje formularze"
            headerTag="h1"
            subheader="Szkice i aktywne formularze Twojej organizacji."
          />
        </div>
        <div className="mt-4">
          <div className="text-sm text-font-light">
            Wykorzystano {forms.length} z {maxFormCount}
          </div>
          <div className="mt-2 h-2 rounded-full bg-white">
            <div
              className="h-full rounded-full bg-accent"
              style={{
                width: `${formsRatio}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <ul className="gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <li className="">
          <SuspenseErrorBoundary
            errorMessage="Błąd tworzenia formularza"
            size="sm"
          >
            <FormTrigger freePlaces={freePlaces} />
          </SuspenseErrorBoundary>
        </li>

        {forms?.map((form) => {
          return <FormLink form={form} key={form._id} />;
        })}
      </ul>
    </>
  );
};

export default FormsLIst;
