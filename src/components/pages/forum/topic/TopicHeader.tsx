"use client";

import {
  TopicSerializedDetailed,
  TopicSerializedWithPostCount,
} from "@/types/forum";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { mapTopicCategory } from "../utils";

type Props = {
  topic: TopicSerializedDetailed | TopicSerializedWithPostCount;
  displayCategory?: boolean;
};

const TopicHeader = ({ topic, displayCategory = true }: Props) => {
  return (
    <>
      <div className="flex items-center gap-md">
        {displayCategory && (
          <div className="text-sm">
            (kategoria:{" "}
            <span className="font-black">
              {mapTopicCategory[topic.category]}
            </span>
            )
          </div>
        )}

        <div className="text-sm">
          Ostatnio modyfikowano / komentowano:{" "}
          <b>{formatDateAndTime(topic.updatedAt)}</b>
        </div>
      </div>

      <div className="my-4">
        Utworzono: <b>{formatDateAndTime(topic.createdAt)}</b> przez:{" "}
        <b>{topic.authorName}</b>
      </div>
    </>
  );
};
export default TopicHeader;
