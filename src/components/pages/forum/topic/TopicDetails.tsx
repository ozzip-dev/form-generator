import { Button, Card } from "@/components/shared";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { TopicSerializedDetailed } from "@/types/forum";
import { mapTopicCategory } from "../utils";

type Props = {
  topic: TopicSerializedDetailed;
  handlePrintForm: () => void;
};

const TopicDetails = (props: Props) => {
  const { topic, handlePrintForm } = props;
  const { title, description, category, createdAt, updatedAt, authorName } =
    topic;

  const dataTopicDetails: { header: string; detail: string }[] = [
    { header: "Temat:", detail: title },
    { header: "Kategoria:", detail: mapTopicCategory[category] },
    { header: "Opis:", detail: description || "Brak opisu" },
    { header: "Utworzono:", detail: formatDateAndTime(createdAt) },
    {
      header: "Ostatnio modyfikowano:",
      detail: formatDateAndTime(updatedAt),
    },
    { header: "Autor:", detail: authorName },
  ];

  return (
    <>
      <Card>
        {dataTopicDetails.map(({ header, detail }) => {
          return (
            <div key={header} className="mb-4">
              <span className="font-black">{header}</span> <span>{detail}</span>
            </div>
          );
        })}
      </Card>

      <Button
        message="Edytuj"
        type="button"
        onClickAction={handlePrintForm}
        className="m-auto w-full sm:w-fit mt-10"
      />
    </>
  );
};

export default TopicDetails;
