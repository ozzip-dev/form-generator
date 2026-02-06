import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";

type Props = {
  createdAt: string;
  updatedAt: string;
};

export default function CreatedUpdatedInfo({ createdAt, updatedAt }: Props) {
  return (
    <div className="flex gap-10">
      <div className="mt-1 text-xs text-gray-400">
        Edytowano: {formatDateAndTime(updatedAt)}
      </div>
      <div className="mt-1 text-xs text-gray-400">
        Utworzono: {formatDateAndTime(createdAt)}
      </div>
    </div>
  );
}
