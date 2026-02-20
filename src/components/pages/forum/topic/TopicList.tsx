"use client";

import { TopicSerializedDetailed } from "@/types/forum";
import TopicListItem from "./TopicListItem";
import { TopicCategory } from "@/enums/forum";
import { useState } from "react";
import { Button } from "@/components/shared";
import { mapTopicCategory } from "../utils";

type Props = {
  topics: TopicSerializedDetailed[];
};

const TopicList = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<TopicCategory>(
    TopicCategory.FORM,
  );

  const displayedTopics = props.topics.filter(
    ({ category }) => category == selectedCategory,
  );

  const categoryDescriptions: Record<TopicCategory, string> = {
    [TopicCategory.FORM]:
      "Tematy związane z formularzami. Jeśli masz wątpliwości dotyczące pytań, które warto zamieścić, trybów tajności oraz najlepszych praktyk, to odpowiednie miejsce, aby się nimi podzielić.",
    [TopicCategory.PROTOCOL]:
      "Tematy związane z protokołami ze sporów zbiorowych. Jeśli masz wątpliwości, kiedy i jak tworzyć protokół, które załączniki zawrzeć, itd. otwórz odpowiedni temat, by otrzymać pomoc. ",
    [TopicCategory.OTHER]:
      "Miejsce na wszelkie tematy nie związane bezpośrednio z formularzami lub protokołami ze sporów zbiorowych.",
  };

  return (
    <div>
      <div className="text-center text-lg">Kategorie tematów </div>
      <div className="m-auto flex w-fit flex-wrap items-center gap-x-8 gap-y-4 py-4">
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

      <div className="p-4 pb-8">{categoryDescriptions[selectedCategory]}</div>

      <div>
        {displayedTopics?.length ? (
          displayedTopics.map((topic, idx) => (
            <TopicListItem key={idx} {...topic} />
          ))
        ) : (
          <div className="px-4">Brak tematów z wybranej kategorii</div>
        )}
      </div>
    </div>
  );
};

export default TopicList;
