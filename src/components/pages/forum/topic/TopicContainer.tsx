import { TopicSerialized } from "@/types/forum";
import TopicActionButtons from "./TopicActionButtons";

type Props = {
  topic: TopicSerialized;
};

const TopicContainer = (props: Props) => {
  return (
    <div className="w-full bg-slate-200 p-4">
      <div className="font-black text-lg">{props.topic.title}</div>
      <div>{props.topic.description}</div>
      <TopicActionButtons {...props.topic} />
    </div>
  );
};

export default TopicContainer;
