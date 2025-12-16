import { TopicSerialized } from "@/types/forum";
import TopicActions from "./TopicActions";
import TopicPosts from "../post/TopicPosts";

type Props = {
  topic: TopicSerialized;
};

const TopicContainer = (props: Props) => {
  return (
    <div className="w-full mb-8 bg-slate-200 p-4">
      <div className="font-black text-lg">{props.topic.title}</div>
      <div>{props.topic.description}</div>
      <TopicPosts topicId={props.topic._id} />
      <TopicActions {...props.topic} />
    </div>
  );
};

export default TopicContainer;
