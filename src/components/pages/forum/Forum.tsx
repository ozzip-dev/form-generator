import CreateTopicForm from "./topic/CreateTopicForm";
import TopicList from "./topic/TopicList";
import { getTopicIds, getTopicWithPostCount } from "@/services/forum-service";

const Forum = async () => {
  const topicIds = await getTopicIds();
  const topicsWithPostCount = await Promise.all(
    topicIds.map(getTopicWithPostCount),
  );
  return (
    <div className="px-8 py-12">
      <CreateTopicForm />
      <TopicList topics={topicsWithPostCount} />
    </div>
  );
};

export default Forum;
