import { Button, Card } from "@/components/shared";
import { TopicSerializedWithPostCount } from "@/types/forum";
import Link from "next/link";
import TopicHeader from "./TopicHeader";

const TopicListItem = (topic: TopicSerializedWithPostCount) => {
  const { _id, title, description, postCount, category } = topic;
  return (
    <Card className="mb-8">
      <TopicHeader topic={topic} displayCategory={false} />
      <div className="flex gap-4 text-lg font-black">
        <div>{title}</div>
      </div>
      <div className="py-4">{description}</div>
      <div>({postCount} odpowiedzi)</div>
      <Link href={`/forum/${_id}`}>
        <Button variant="primary-rounded" message="Otwórz" className="mt-6" />
      </Link>
    </Card>
  );
};

export default TopicListItem;
