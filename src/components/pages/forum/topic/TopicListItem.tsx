import { Button, Card } from "@/components/shared";
import { TopicSerializedDetailed } from "@/types/forum";
import Link from "next/link";
import TopicHeader from "./TopicHeader";

const TopicListItem = (topic: TopicSerializedDetailed) => {
  const { _id, title, description, posts } = topic;
  return (
    <Card className="mb-8">
      <TopicHeader topic={topic} displayCategory={false} />
      <div className="flex gap-4 text-lg font-black">
        <div>{title}</div>
      </div>
      <div className="py-4">{description}</div>
      <div>({posts?.length || 0} odpowiedzi)</div>
      <Link href={`/forum/${_id}`}>
        <Button variant="primary-rounded" message="Otwórz" className="mt-6" />
      </Link>
    </Card>
  );
};

export default TopicListItem;
