import { ButtonLink, Icon } from "@/components/shared";
import IconCart from "@/components/shared/icons/IconCart";
import { TemplateFormId } from "@/lib/mongo/models";
import Image from "next/image";
import Link from "next/link";

type Props = {
  _id?: string;
  id?: TemplateFormId;
  templateTitle: string;
  subtitle: string;
  icon: string;
};

const FormTemplate = ({ _id, id, templateTitle, icon, subtitle }: Props) => {
  const templateCard = (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-sm border border-gray p-10">
      <div className="flex items-center justify-between">
        {_id ? (
          <IconCart>
            <Icon icon={icon} size={30} className="bg-white" />
          </IconCart>
        ) : (
          <div className="w-fit rounded-sm border border-white bg-white/10 p-4">
            <Icon icon={icon} size={30} className="bg-white" />
          </div>
        )}

        <div
          className={`rounded-full border p-3 transition-colors duration-300 ${_id ? "border-gray group-hover:border-accent_dark group-hover:bg-accent_dark" : "border-white group-hover:border-accent_dark group-hover:bg-accent_dark"}`}
        >
          <Icon
            icon={"arrow"}
            size={20}
            className={`-rotate-[130deg] transition-transform duration-300 group-hover:-translate-y-2 ${_id ? "bg-font_light group-hover:bg-white" : "bg-white"}`}
          />
        </div>
      </div>{" "}
      <div className="mt-auto">
        <p className={` ${_id ? "text-accent" : "text-white"}`}>{subtitle}</p>
        <p className="text-md mt-2 text-lg font-bold">{templateTitle}</p>
      </div>
    </div>
  );

  return _id ? (
    <Link
      href={`/${_id}`}
      target="_blank"
      aria-label={`Zobacz ${templateTitle ?? "formularz"}`}
      className="mx-auto mb-8 block h-full overflow-hidden rounded-sm border border-gray bg-bg_light transition-transform duration-300 hover:-translate-y-2"
    >
      {templateCard}
    </Link>
  ) : (
    <Link
      href={`/login`}
      target="_blank"
      className="bg-gradient-accent-light mx-auto mb-8 block h-full cursor-pointer overflow-hidden rounded-sm border border-gray text-white transition-transform duration-300 hover:-translate-y-2"
    >
      {templateCard}
    </Link>
  );
};

export default FormTemplate;
