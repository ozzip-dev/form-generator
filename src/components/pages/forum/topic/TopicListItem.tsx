import { Button } from "@/components/shared";
import { TopicSerializedWithPostCount } from "@/types/forum";
import Link from "next/link";

const TopicListItem = (topic: TopicSerializedWithPostCount) => {
  const { _id, title, description, postCount } = topic;
  return (
    <div className="w-full mb-8 bg-slate-200 p-4">
      <div className="font-black text-lg">{title}</div>
      <div>{description}</div>
      <div>({postCount} odpowiedzi)</div>
      <Link href={`/forum/${_id}`}>
        <Button message="Otwórz" className="!w-40" />
      </Link>
    </div>
  );
};

export default TopicListItem;
