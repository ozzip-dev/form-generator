import { addTopic } from "@/actions/forum/addTopic";
import { FullscreenLoader } from "@/components/shared";
import { TopicCategory } from "@/enums/forum";
import { CreateTopicSchema } from "@/lib/zodSchema/createTopicSchema";
import { startTransition, useActionState } from "react";

const CreateTopicForm = () => {
  const [state, createNewTopic, isPending] = useActionState<null, CreateTopicSchema>(
    async (_state, { title, description, category }) => {
      if (!title || !description) return null;
      await addTopic(title, category as TopicCategory, description);
      return null;
    },
    null
  );

  const handleCreateTopic = (topic: CreateTopicSchema) => {
    startTransition(() => {
      createNewTopic(topic);
    });
  };

  return (
    <>
      {isPending && <FullscreenLoader />}
      {/* <form onSubmit={handleCreateTopic}></form> */}
    </>
  );
};

export default CreateTopicForm;
