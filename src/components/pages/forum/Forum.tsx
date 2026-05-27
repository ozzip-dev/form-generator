import TopicList from "./topic/TopicList";
import { getDetailedTopic, getTopicIds } from "@/services/forum-service";

const Forum = async () => {
  const topicIds = await getTopicIds();
  const topicsWithPostCount = await Promise.all(topicIds.map(getDetailedTopic));
  return <TopicList topics={topicsWithPostCount} />;
};

export default Forum;
