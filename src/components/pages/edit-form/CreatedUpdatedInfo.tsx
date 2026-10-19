import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";

type Props = {
  createdAt: string;
  updatedAt: string;
};

export default function CreatedUpdatedInfo({ createdAt, updatedAt }: Props) {
  return (
    <div className="text-font-light mt-6 flex gap-10 text-2xs">
      <div>Edycja: {formatDateAndTime(updatedAt)}</div>
      <div>Utworzony: {formatDateAndTime(createdAt)}</div>
    </div>
  );
}
