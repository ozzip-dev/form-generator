import { ButtonLink } from "@/components/shared";
import { TemplateFormId } from "@/lib/mongo/models";
import Image from "next/image";

type Props = {
  _id?: string;
  id?: TemplateFormId;
  templateTitle?: string;
};

const FormTemplate = ({ _id, id, templateTitle }: Props) => {
  return (
    <div>
      <div className="relative mx-auto mb-8 flex items-center justify-center overflow-hidden rounded-[40px] text-font_dark">
        <Image
          src={`/images/templates/${id || "custom"}.png`}
          alt=""
          width={300}
          height={250}
          className="h-auto w-full"
          style={!!id ? { border: "25px #f0f0f0 solid" } : {}}
        />

        <div className="absolute inset-0 mt-auto flex w-full items-end justify-center">
          <p className="h-1/3 w-full bg-white px-4 pt-3 text-center leading-7 sm:pt-6 xl:pt-8">
            {templateTitle}
          </p>
        </div>
      </div>

      {!!_id && (
        <ButtonLink
          target="_blank"
          message="Zobacz"
          ariaLabel={`Zobacz ${templateTitle ?? "formularz"}`}
          link={`/${_id}`}
          variant="primary-rounded"
          className="hover:!bg-font_white mx-auto my-6 w-fit !border-white !bg-font_dark hover:!bg-white hover:!text-font_dark sm:my-10 md:my-12"
        />
      )}
    </div>
  );
};

export default FormTemplate;
