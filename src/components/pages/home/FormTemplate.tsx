import { ButtonLink, Icon } from "@/components/shared";
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
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-sm border border-gray p-10 ${
        _id
          ? "cursor-pointer transition-transform duration-100 hover:scale-[1.03]"
          : ""
      }`}
    >
      {/* <Image
        src={`/images/templates/${id || "custom"}.png`}
        alt=""
        width={300}
        height={250}
        className="h-auto w-full"
        style={!!id ? { border: "25px #f0f0f0 solid" } : {}}
      /> */}

      <div className="">
        <p className="my-6 text-lg font-bold">{templateTitle}</p>
      </div>
      <div className="mt-auto flex items-center gap-2">
        {" "}
        {_id ? <div>Zobacz</div> : <div>Zaczynam</div>}{" "}
        {
          <Icon
            icon={"chevron-down-solid-full"}
            size={15}
            className={`-rotate-90 ${_id ? "bg-font_dark" : "bg-white"}`}
          />
        }
      </div>

      {/* {_id && (
        <div className="absolute inset-0 opacity-0 transition-opacity duration-100 group-hover:opacity-100">
          <div className="absolute inset-0 bg-font_dark opacity-80" />

          <div className="relative z-10 flex h-full w-full items-center justify-center">
            <div className="btn-primary-rounded !border-white !bg-font_dark text-white hover:!bg-white hover:!text-font_dark">
              Zobacz
            </div>
          </div>
        </div>
      )} */}
    </div>
  );

  return _id ? (
    <Link
      href={`/${_id}`}
      target="_blank"
      aria-label={`Zobacz ${templateTitle ?? "formularz"}`}
      className="mx-auto mb-8 block h-full overflow-hidden rounded-sm border border-gray bg-bg_light"
    >
      {templateCard}
    </Link>
  ) : (
    <Link
      href={`/login`}
      target="_blank"
      className="bg-gradient-accent mx-auto mb-8 block h-full cursor-pointer overflow-hidden rounded-sm border border-gray text-white"
    >
      {templateCard}
    </Link>
  );
};

export default FormTemplate;
