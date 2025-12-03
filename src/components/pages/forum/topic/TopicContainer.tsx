import { Topic } from "@/types/forum";

const TopicContainer = (topic: Topic) => {
  return (
    <div>
      <div>{topic.title}</div>
      <div>{topic.description}</div>
    </div>
  );
};

export default TopicContainer;
