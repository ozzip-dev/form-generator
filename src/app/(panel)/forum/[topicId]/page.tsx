import { SuspenseErrorBoundary } from "@/components/shared";
import { getDetailedTopic } from "@/services/forum-service";
import TopicContainer from "@/components/pages/forum/topic/TopicContainer";

type Props = { params: Promise<{ topicId: string }> };

const TopicItemPage = async (props: Props) => {
  const { topicId } = await props.params;
  const topic = await getDetailedTopic(topicId);

  return (
    <SuspenseErrorBoundary errorMessage="Błąd Pobierania tematu" size="sm">
      <TopicContainer {...topic} />
    </SuspenseErrorBoundary>
  );
};

export default TopicItemPage;
