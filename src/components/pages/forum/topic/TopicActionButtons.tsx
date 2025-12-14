"use client";

import { removeTopicAction } from "@/actions/forum/removeTopicAction";
import { Button } from "@/components/shared";
import { useUser } from "@/context/UserContextProvider";
import { isTopicAuthor } from "@/helpers/forumHelpers";
import { TopicSerialized } from "@/types/forum";
import { UserSerialized } from "@/types/user";
import { use } from "react";

const TopicActionButtons = (topic: TopicSerialized) => {
  const { userPromise } = useUser();
  const user: UserSerialized | null = use(userPromise);
  // TODO: remember to add also to server side checks
  const isAuthor = !!(user && isTopicAuthor(user, topic));

  const buttons: {
    text: string;
    action: (id: string) => void | Promise<void>;
    isDisplayed: boolean;
  }[] = [
    {
      text: "Odpowiedz",
      action: () => {},
      isDisplayed: true,
    },
    {
      text: "Edytuj",
      action: () => {},
      isDisplayed: isAuthor,
    },
    {
      text: "Usuń",
      action: removeTopicAction,
      isDisplayed: isAuthor,
    },
  ];

  return (
    <div
      className="
      w-full bg-slate-200 p-4
      flex gap-4  
    "
    >
      {buttons
        .filter(({ isDisplayed }) => isDisplayed)
        .map(({ text, action }, idx) => (
          <Button
            key={idx}
            message={text}
            onClickAction={() => action(topic._id)}
          />
        ))}
    </div>
  );
};

export default TopicActionButtons;
