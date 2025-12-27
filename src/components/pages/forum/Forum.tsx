import { db, findAll } from "@/lib/mongo";
import { Topic } from "@/types/forum";
import CreateTopicForm from "./topic/CreateTopicForm";
import TopicList from "./topic/TopicList";
import { getTopicIds, getTopicWithPostCount } from "@/services/forum-service";

const Forum = async () => {
  const topics = await findAll<Topic>(db, "topic");
  const topicIds = await getTopicIds();
  const topicsWithPostCount = await Promise.all(
    topicIds.map(getTopicWithPostCount)
  );
  return (
    <>
      <CreateTopicForm />
      <TopicList topics={topicsWithPostCount} />
    </>
  );
};

export default Forum;
