"use client";

import { removeTopicAction } from "@/actions/forum/removeTopicAction";
import { Button } from "@/components/shared";
import { useUser } from "@/context/UserContextProvider";
import { isTopicAuthor } from "@/helpers/forumHelpers";
import { TopicSerialized } from "@/types/forum";
import { UserSerialized } from "@/types/user";
import { use, useState } from "react";
import AddPostForm from "./AddPostForm";

const TopicActionButtons = (topic: TopicSerialized) => {
  const [showPostForm, setShowPostForm] = useState<boolean>(false);
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
      action: () => {
        setShowPostForm(!showPostForm);
      },
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
    <div>
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

      {showPostForm && (
        <AddPostForm topicId={topic._id} setShowPostForm={setShowPostForm} />
      )}
    </div>
  );
};

export default TopicActionButtons;
