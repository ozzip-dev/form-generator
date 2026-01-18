"use client";

import { TopicSerializedDetailed } from "@/types/forum";
import TopicActions from "./TopicActions";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import TopicPosts from "../post/TopicPosts";
import Link from "next/link";
import { Button } from "@/components/shared";
import { mapTopicCategory } from "../utils";
import { useState } from "react";
import TopicForm from "./TopicForm";
import { SuspenseErrorBoundary } from "@/components/shared";

const TopicContainer = (topic: TopicSerializedDetailed) => {
  const [isFormPrinted, setFormPrinted] = useState(false);

  const handlePrintForm = () => {
    setFormPrinted((prev) => !prev);
  };

  return (
    <div className="px-8">
      <Link href={"/forum"}>
        <Button
          message="<< Powrót do listy"
          variant="primary-rounded"
          className="mb-8"
        />
      </Link>

      {!isFormPrinted && (
        <div className="w-full mb-8 bg-slate-200 p-4">
          <div className="flex gap-4 font-black text-lg">
            <div>{topic.title}</div>
            <div>({mapTopicCategory[topic.category]})</div>
          </div>

          <div>
            Utworzono: <b>{formatDateAndTime(topic.createdAt)}</b> przez:{" "}
            <b>{topic.authorName}</b>
          </div>

          <div>
            Ostatnio modyfikowano/komentowano:{" "}
            <b>{formatDateAndTime(topic.updatedAt)}</b>
          </div>

          <div>{topic.description}</div>
          <TopicPosts posts={topic.posts} />
          <TopicActions topic={topic} handlePrintForm={handlePrintForm} />
        </div>
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
