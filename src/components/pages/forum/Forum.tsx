import TopicList from "./topic/TopicList";
import { getDetailedTopic, getTopicIds } from "@/services/forum-service";

const Forum = async () => {
  const topicIds = await getTopicIds();
  const topicsWithPostCount = await Promise.all(topicIds.map(getDetailedTopic));
  return (
    <div className="p-8">
      <TopicList topics={topicsWithPostCount} />
    </div>
  );
};

export default Forum;
