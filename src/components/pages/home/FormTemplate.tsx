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
      <div className="relative mx-auto mb-6 flex items-center justify-center rounded-sm text-font_dark">
        <Image
          src={`/images/templates/${id || "custom"}.png`}
          alt=""
          width={300}
          height={250}
          className="h-auto w-[300px]"
        />

        <div className="absolute inset-0 mt-auto flex items-end justify-center text-lg">
          <p className="h-1/5 px-4 text-center text-base leading-8">
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
          className="hover:!bg-font_white mx-auto my-12 w-fit !border-white !bg-font_dark hover:!bg-white hover:!text-font_dark"
        />
      )}
    </div>
  );
};

export default FormTemplate;
