import Forum from "@/components/pages/forum/Forum";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formy pracy - Forum",
};

const ForumPage = async () => {
  return <Forum />;
};

export default ForumPage;
