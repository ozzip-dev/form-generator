import { getSerializedFormList } from "@/services/form-service";
import FormLink from "./FormLink";
import { SuspenseErrorBoundary } from "@/components/shared";
import FormTrigger from "../FormTrigger";
import SectionHeader from "@/components/shared/SectionHeader";

const FormsLIst = async () => {
  const forms = await getSerializedFormList();

  const formCountLimit = process.env.NEXT_PUBLIC_MAX_FORMS_PER_USER;

  return (
    <>
      <div className="w-full items-center md:flex">
        <SectionHeader message="Twoje formularze" headerTag="h1" />
        <div className="mb-7 mt-auto text-center text-xs md:ml-4 md:text-left">
          maksymalnie {formCountLimit} szkiców i aktywnych formularzy
        </div>
      </div>

      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-8 text-sm md:justify-start">
        <li className="w-[11rem]">
          <SuspenseErrorBoundary
            errorMessage="Błąd tworzenia formularza"
            size="sm"
          >
            <FormTrigger />
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
