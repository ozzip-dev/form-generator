import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import Link from "next/link";

type Props = {
  id: string;
  title: string;
  count: number;
  publishedAt: string;
};

const ActiveForm = async (props: Props) => {
  return (
    <div className="flex items-center gap-24">
      <div>
        <div className="flex items-center gap-4">
          <div className="font-black">{props.title} </div>
          <div className="text-sm">
            (opublikowano: {formatDateAndTime(props.publishedAt)})
          </div>
        </div>

        <div>
          Liczba rezultatów: <span className="font-black">{props.count}</span>
        </div>
      </div>
      <Link
        className="btn-primary-rounded"
        href={`/forms/${props.id}/results/table`}
      >
        Zobacz wyniki
      </Link>{" "}
    </div>
  );
};

export default ActiveForm;
