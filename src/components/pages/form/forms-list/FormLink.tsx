import Link from "next/link";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { FormSerialized } from "@/types/form";

type Props = { form: Partial<FormSerialized> };

export default function FormLink(props: Props) {
  const formatted = formatDateAndTime(props.form.updatedAt);

  return (
    <li className="w-[13rem]">
      <Link
        href={`/forms/${props.form._id}/edit`}
        className="block h-[13rem] w-full rounded-md border bg-bg_light transition hover:bg-accent md:rounded-lg"
      />

      <div className="mt-4 line-clamp-2 px-4 text-center">
        {props.form.title ? props.form.title : "Brak tytułu"}
      </div>
      <p className="mt-1 truncate text-center text-2xs text-font_light">
        Edycja <br /> {formatted}
      </p>
    </li>
  );
}
