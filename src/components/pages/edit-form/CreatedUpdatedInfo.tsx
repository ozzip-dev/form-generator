import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";

type Props = {
  createdAt: string;
  updatedAt: string;
};

export default function CreatedUpdatedInfo({ createdAt, updatedAt }: Props) {
  return (
    <div className="mt-6 gap-10 text-sm text-font-light sm:flex md:block">
      <div>Edycja: {formatDateAndTime(updatedAt)}</div>
      <div>Utworzony: {formatDateAndTime(createdAt)}</div>
    </div>
  );
}
