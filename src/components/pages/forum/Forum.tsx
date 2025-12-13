import { db, findAll } from "@/lib/mongo";
import { serializeTopic } from "@/lib/serialize-utils";
import { Topic } from "@/types/forum";
import { TopicSerialized } from "@/types/forum";
import CreateTopicForm from "./topic/CreateTopicForm";
import TopicList from "./topic/TopicList";

const Forum = async () => {
  const topics = await findAll<Topic>(db, "topic");
  const topicsSerialized: TopicSerialized[] = topics.map(serializeTopic);
  return (
    <>
      <div>forum</div>
      <CreateTopicForm />
      <TopicList topics={topicsSerialized} />
    </>
  );
};

export default Forum;
