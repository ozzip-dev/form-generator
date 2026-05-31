import { ButtonLink } from "@/components/shared";
import { TemplateFormId } from "@/lib/mongo/models";
import Image from "next/image";

type Props = {
  _id?: string;
  id?: TemplateFormId;
  templateTitle?: string;
  templateImages: Record<TemplateFormId, string>;
};

const FormTemplate = ({ _id, id, templateTitle, templateImages }: Props) => {
  return (
    <div className="">
      <div className="relative mx-auto mb-6 flex items-center justify-center rounded-sm text-font_dark">
        <Image
          src={`/images/${id ? templateImages[id] : "survey"}.svg`}
          alt=""
          width={300}
          height={250}
          className="h-auto w-[300px]"
        />

        <div className="absolute inset-0 mt-auto flex items-end justify-center text-lg">
          <p className="h-[30%] px-4 text-center leading-8">{templateTitle}</p>
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
};

export default FormTemplate;
