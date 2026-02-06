import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";

type Props = {
  createdAt: string;
  updatedAt: string;
};

export default function CreatedUpdatedInfo({ createdAt, updatedAt }: Props) {
  return (
    <div className="mt-6 flex gap-10">
      <div className="mt-1 text-xs text-font_light">
        Edytowano: {formatDateAndTime(updatedAt)}
      </div>
      <div className="mt-1 text-xs text-font_light">
        Utworzono: {formatDateAndTime(createdAt)}
      </div>
    </div>
  );
}
