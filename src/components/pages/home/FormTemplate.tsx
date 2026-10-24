import { Icon } from "@/components/shared";
import CardSmall from "@/components/shared/cards/CardSmall";
import IconCart from "@/components/shared/icons/IconCart";
import { TemplateFormId } from "@/lib/mongo/models";
import Link from "next/link";

type Props = {
  _id?: string;
  id?: TemplateFormId;
  templateTitle: string;
  subtitle: string;
  icon: string;
};

const FormTemplate = ({ _id, templateTitle, icon, subtitle }: Props) => {
  const isTemplate = Boolean(_id);

  return (
    <Link
      href={isTemplate ? `/${_id}` : "/login"}
      target="_blank"
      aria-label={`Zobacz ${templateTitle}`}
      className={`mx-auto mb-8 block h-full overflow-hidden rounded-sm border border-gray transition-transform duration-300 hover:-translate-y-2 hover:border-accent ${
        isTemplate ? "bg-bg-light" : "bg-gradient-accent-light text-white"
      }`}
    >
      <CardSmall className="group relative flex flex-col justify-between !bg-transparent">
        <div className="flex items-center justify-between">
          {isTemplate ? (
            <IconCart>
              <Icon icon={icon} size={30} className="bg-white" />
            </IconCart>
          ) : (
            <div className="w-fit rounded-sm border border-white bg-white/10 p-4">
              <Icon icon={icon} size={30} className="bg-white" />
            </div>
          )}

          <div
            className={`group-hover:border-accent-dark group-hover:bg-accent-dark rounded-full border p-3 transition-colors duration-300 ${
              isTemplate ? "border-gray" : "border-white"
            }`}
          >
            <Icon
              icon="arrow"
              size={20}
              className={`-rotate-[130deg] transition-colors duration-300 ${
                isTemplate ? "bg-font-light group-hover:bg-white" : "bg-white"
              }`}
            />
          </div>
        </div>

        <div className="mt-auto">
          <p className={`text-xs ${isTemplate ? "text-accent" : "text-white"}`}>
            {subtitle}
          </p>
          <p className="mt-2 font-bold">{templateTitle}</p>
        </div>
      </CardSmall>
    </Link>
  );
};

export default FormTemplate;
