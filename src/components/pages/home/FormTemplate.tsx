import { ButtonLink } from "@/components/shared";
import { TemplateFormId } from "@/lib/mongo/models";
import Image from "next/image";
import Link from "next/link";

type Props = {
  _id?: string;
  id?: TemplateFormId;
  templateTitle?: string;
};

const FormTemplate = ({ _id, id, templateTitle }: Props) => {
  const templateCard = (
    <div
      className={`group relative flex items-center justify-center overflow-hidden rounded-[40px] text-font_dark ${
        _id
          ? "cursor-pointer transition-transform duration-100 hover:scale-[1.03]"
          : ""
      }`}
    >
      <Image
        src={`/images/templates/${id || "custom"}.png`}
        alt=""
        width={300}
        height={250}
        className="h-auto w-full"
        style={!!id ? { border: "25px #f0f0f0 solid" } : {}}
      />

      <div className="absolute inset-0 mt-auto flex w-full items-end justify-center">
        <p className="h-[37%] w-full bg-white px-4 pt-3 text-center leading-7 sm:h-1/3 sm:pt-6 xl:pt-8">
          {templateTitle}
        </p>
      </div>

      {_id && (
        <div className="absolute inset-0 opacity-0 transition-opacity duration-100 group-hover:opacity-100">
          <div className="absolute inset-0 bg-font_dark opacity-80" />

          <div className="relative z-10 flex h-full w-full items-center justify-center">
            <div className="btn-primary-rounded !border-white !bg-font_dark text-white hover:!bg-white hover:!text-font_dark">
              Zobacz
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return _id ? (
    <Link
      href={`/${_id}`}
      target="_blank"
      aria-label={`Zobacz ${templateTitle ?? "formularz"}`}
      className="mx-auto mb-8 block"
    >
      {templateCard}
    </Link>
  ) : (
    <div className="mx-auto mb-8">{templateCard}</div>
  );
};

export default FormTemplate;
