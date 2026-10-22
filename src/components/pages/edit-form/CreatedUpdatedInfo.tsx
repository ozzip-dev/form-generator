import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";

type Props = {
  createdAt: string;
  updatedAt: string;
};

export default function CreatedUpdatedInfo({ createdAt, updatedAt }: Props) {
  return (
    <div className="text-font-light mt-4 flex flex-row gap-2 text-2xs md:flex-col">
      <div>Edycja: {formatDateAndTime(updatedAt)}</div>
      <div>Utworzony: {formatDateAndTime(createdAt)}</div>
    </div>
  );
}
