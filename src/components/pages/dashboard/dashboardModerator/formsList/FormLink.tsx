import Link from "next/link";
import { FormType } from "@/actions/form/GetFormsList";
import { formatDateAndHour } from "@/helpers/dates/formatDateAndHour";

type Props = { form: FormType };

export default function FormLink(props: Props) {
  const formatted = formatDateAndHour(props.form.updatedAt);

  return (
    <Link
      href={`/create-form/${props.form._id}/edit`}
      className="block p-4 border rounded hover:bg-gray-50 transition"
    >
      <h3 className="text-lg font-semibold">{props.form.title}</h3>
      <p className="text-sm text-gray-600">{props.form.description}</p>
      <p className="text-xs text-gray-400 mt-1">Aktualizacja {formatted}</p>
    </Link>
  );
}
