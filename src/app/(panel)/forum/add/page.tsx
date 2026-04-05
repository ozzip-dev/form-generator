import CreateTopicForm from "@/components/pages/forum/topic/CreateTopicForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formy pracy - Tworzenie tematu na forum",
};

const ForumPage = async () => {
  return <CreateTopicForm />;
};

export default ForumPage;
