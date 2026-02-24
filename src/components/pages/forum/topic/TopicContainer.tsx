"use client";

import { TopicSerializedDetailed } from "@/types/forum";
import TopicActions from "./TopicActions";
import TopicPosts from "../post/TopicPosts";
import Link from "next/link";
import { Button, Card } from "@/components/shared";
import { useState } from "react";
import TopicForm from "./TopicForm";
import { SuspenseErrorBoundary } from "@/components/shared";
import TopicHeader from "./TopicHeader";

const TopicContainer = (topic: TopicSerializedDetailed) => {
  const [isFormPrinted, setFormPrinted] = useState(false);

  const handlePrintForm = () => {
    setFormPrinted((prev) => !prev);
  };

  return (
    <div className="px-8">
      <Link href="/forum">
        <Button
          message="<< Powrót do listy"
          variant="primary-rounded"
          className="mb-8"
        />
      </Link>

      {!isFormPrinted && (
        <Card>
          <TopicHeader topic={topic} />

          <div className="pb-4 text-lg font-black">{topic.title}</div>

          <div>{topic.description}</div>
          <TopicPosts posts={topic.posts} />
          <TopicActions topic={topic} handlePrintForm={handlePrintForm} />
        </Card>
      )}

      {isFormPrinted && (
        <SuspenseErrorBoundary size="lg" errorMessage="Błąd edycji tematu">
          <TopicForm topic={topic} handlePrintForm={handlePrintForm} />
        </SuspenseErrorBoundary>
      )}
    </div>
  );
};

export default TopicContainer;
