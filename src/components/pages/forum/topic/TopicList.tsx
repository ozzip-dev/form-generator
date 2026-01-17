"use client";

import { TopicSerializedWithPostCount } from "@/types/forum";
import TopicListItem from "./TopicListItem";
import { TopicCategory } from "@/enums/forum";
import { useState } from "react";
import { Button } from "@/components/shared";
import { mapTopicCategory } from "../utils";

type Props = {
  topics: TopicSerializedWithPostCount[];
};

const TopicList = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<TopicCategory>(
    TopicCategory.FORM,
  );

  const displayedTopics = props.topics.filter(
    ({ category }) => category == selectedCategory,
  );
  // TODO: move to separate components
  return (
    <div>
      <div className="flex w-fit gap-8 py-4 m-auto">
        {Object.values(TopicCategory).map((category) => (
          <Button
            key={category}
            className={`!px-8 !text-base ${
              category == selectedCategory ? "!bg-accent_dark" : ""
            }`}
            message={mapTopicCategory[category]}
            onClickAction={() => setSelectedCategory(category)}
          />
        ))}
      </div>

      <div>
        {displayedTopics?.length ? (
          displayedTopics.map((topic, idx) => (
            <TopicListItem key={idx} {...topic} />
          ))
        ) : (
          <div>Brak tematów z wybranej kategorii</div>
        )}
      </div>
    </div>
  );
};

export default TopicList;
