import { TopicSerializedDetailed } from "@/types/forum";
import TopicActions from "./TopicActions";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import TopicPosts from "../post/TopicPosts";
import Link from "next/link";
import { Button } from "@/components/shared";

const TopicContainer = (topic: TopicSerializedDetailed) => {
  const { authorName, createdAt, updatedAt, description, title, posts } = topic;
  return (
    <>
      <Link href={"/forum"}>
        <Button message="<< Powrót do listy" className="!w-60 mb-8" />
      </Link>
      <div className="w-full mb-8 bg-slate-200 p-4">
        <div className="font-black text-lg">{title}</div>

        <div>
          Utworzono: <b>{formatDateAndTime(createdAt)}</b> przez:{" "}
          <b>{authorName}</b>
        </div>

        <div>
          Ostatnia modyfikacja: <b>{formatDateAndTime(updatedAt)}</b>
        </div>

        <div>{description}</div>
        <TopicPosts posts={posts} />
        <TopicActions {...topic} />
      </div>
    </>
  );
};

export default TopicContainer;
