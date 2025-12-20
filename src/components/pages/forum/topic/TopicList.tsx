import { TopicSerializedWithPostCount } from "@/types/forum";
import TopicListItem from "./TopicListItem";

type Props = {
  topics: TopicSerializedWithPostCount[];
};

const TopicList = (props: Props) => {
  return (
    <div>
      {props.topics.map((topic, idx) => (
        <TopicListItem key={idx} {...topic} />
      ))}
    </div>
  );
};

export default TopicList;
