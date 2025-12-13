import { TopicSerialized } from "@/types/forum";
import TopicContainer from "./TopicContainer";

type Props = {
  topics: TopicSerialized[];
};

const TopicList = (props: Props) => {
  return (
    <div>
      {props.topics.map((item, idx) => (
        <TopicContainer key={idx} topic={item} />
      ))}
    </div>
  );
};

export default TopicList;
