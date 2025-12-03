import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";

type Props = {
  createdAt: string;
  updatedAt: string;
};

export default function CreatedUpdatedInfo({ createdAt, updatedAt }: Props) {
  return (
    <div className="flex justify-between">
      <div className="text-xs text-gray-400 mt-1">
        Edytowano: {formatDateAndTime(updatedAt)}
      </div>
      <div className="text-xs text-gray-400 mt-1">
        Utworzono: {formatDateAndTime(createdAt)}
      </div>
    </div>
  );
}
