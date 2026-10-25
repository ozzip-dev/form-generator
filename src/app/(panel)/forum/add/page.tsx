import CreateTopicForm from "@/components/pages/forum/topic/CreateTopicForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formy pracy - Tworzenie tematu na forum",
};

const ForumPage = async () => {
  return (
    <div className="container mt-8">
      <CreateTopicForm />
    </div>
  );
};

export default ForumPage;
