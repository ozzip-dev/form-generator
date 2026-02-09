"use client";

import { TopicSerializedDetailed } from "@/types/forum";
import TopicActions from "./TopicActions";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import TopicPosts from "../post/TopicPosts";
import Link from "next/link";
import { Button, Card } from "@/components/shared";
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
        <Card>
          <div className="flex items-center gap-md">
            <div className="text-sm">
              (kategoria:{" "}
              <span className="font-black">
                {mapTopicCategory[topic.category]}
              </span>
              )
            </div>

            <div className="text-sm">
              Ostatnio modyfikowano / komentowano:{" "}
              <b>{formatDateAndTime(topic.updatedAt)}</b>
            </div>
          </div>

          <div className="my-4">
            Utworzono: <b>{formatDateAndTime(topic.createdAt)}</b> przez:{" "}
            <b>{topic.authorName}</b>
          </div>

          <div className="font-black text-lg pb-4">{topic.title}</div>

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
