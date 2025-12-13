import { TopicSerialized } from "@/types/forum";

type Props = {
  topic: TopicSerialized;
};

const TopicContainer = (props: Props) => {
  return (
    <div>
      <div>{props.topic.title}</div>
      <div>{props.topic.description}</div>
    </div>
  );
};

export default TopicContainer;
