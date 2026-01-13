import Link from "next/link";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { FormSerialized } from "@/types/form";

type Props = { form: Partial<FormSerialized> };

export default function FormLink(props: Props) {
  const formatted = formatDateAndTime(props.form.updatedAt);

  return (
    <li className="w-[15rem]">
      <Link
        href={`/forms/${props.form._id}/edit`}
        className="block border !rounded-md h-[15rem] w-full 
        bg-bg_light hover:bg-accent transition"
      />

      <div className="mt-4 px-4 text-center truncate">
        {props.form.title ? props.form.title : "Brak tytułu"}
      </div>
      <p className="mt-1 text-2xs text-center truncate">Edycja {formatted}</p>
    </li>
  );
}
