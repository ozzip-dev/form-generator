import { PostSerializedDetailed } from "@/types/forum";
import TopicPostItem from "./TopicPostItem";

type Props = {
  posts: PostSerializedDetailed[];
};

const TopicPostList = (props: Props) => {
  return (
    <div className="flex flex-col gap-sm divide-y divide-default pb-sm">
      {props.posts.map((post, idx) => (
        <TopicPostItem key={idx} post={post} />
      ))}
    </div>
  );
};

export default TopicPostList;
