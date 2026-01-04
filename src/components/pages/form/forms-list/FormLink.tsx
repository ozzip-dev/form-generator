import Link from "next/link";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { FormSerialized } from "@/types/form";

type Props = { form: Partial<FormSerialized> };

export default function FormLink(props: Props) {
  const formatted = formatDateAndTime(props.form.updatedAt);

  return (
    <Link
      href={`/forms/${props.form._id}/edit`}
      className="block p-4 border rounded hover:bg-gray-50 transition"
    >
      <h3 className="text-lg font-semibold">{props.form.title}</h3>
      <p className="text-sm text-gray-600">{props.form.description}</p>
      <p className="text-xs text-gray-400 mt-1">Edycja {formatted}</p>
    </Link>
  );
}
