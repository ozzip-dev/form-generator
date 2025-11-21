import { formatDateAndHour } from "@/helpers/dates/formatDateAndHour";

type Props = {
  createdAt: string;
  updatedAt: string;
};

export default function CreatedUpdatedInfo({ createdAt, updatedAt }: Props) {
  return (
    <div className="flex justify-between">
      <div className="text-xs text-gray-400 mt-1">
        Edytowano: {formatDateAndHour(updatedAt)}
      </div>
      <div className="text-xs text-gray-400 mt-1">
        Utworzono: {formatDateAndHour(createdAt)}
      </div>
    </div>
  );
}
