"use client";

import { removeTopicAction } from "@/actions/forum/removeTopicAction";
import { Button, FullscreenLoader } from "@/components/shared";
import { useUser } from "@/context/UserContextProvider";
import { isItemAuthor } from "@/helpers/forumHelpers";
import { TopicSerialized } from "@/types/forum";
import { UserSerialized } from "@/types/user";
import { use, useState } from "react";
import AddPostForm from "./AddPostForm";
import { useToast } from "@/context/ToastProvider";
import { confirmAction } from "@/helpers/confirmAction";
import { useRouter } from "next/navigation";

type Props = {
  topic: TopicSerialized;
  handlePrintForm: () => void;
};

const TopicActionButtons = (props: Props) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPostForm, setShowPostForm] = useState<boolean>(false);

  const { userPromise } = useUser();
  const user: UserSerialized | null = use(userPromise);
  const router = useRouter();

  const isAuthor = !!(user && isItemAuthor(user, props.topic));

  const successToast = (text: string) =>
    toast({
      title: "Sukces",
      description: text,
      variant: "success",
    });

  const buttons: {
    text: string;
    action: (id: string) => void | Promise<void>;
    isDisplayed: boolean;
    errorText: string;
    confirmText?: string;
  }[] = [
    {
      text: "Odpowiedz",
      action: () => {
        setShowPostForm(!showPostForm);
      },
      isDisplayed: true,
      errorText: "Błąd dodawania odpowiedzi",
    },
    {
      text: "Edytuj temat",
      action: props.handlePrintForm,
      isDisplayed: isAuthor,
      errorText: "Błąd edycji tematu",
    },
    {
      text: "Usuń temat",
      action: async () => {
        await removeTopicAction(props.topic._id);
        successToast("Temat usunięty");
      },
      isDisplayed: isAuthor,
      errorText: "Błąd usuwania tematu",
      confirmText: "Czy usunąć temat",
    },
  ];

  const triggerAction = async (
    action: (id: string) => void | Promise<void>,
    id: string,
    errorText: string,
    confirmText: string,
  ) => {
    setIsLoading(true);
    try {
      if (!confirmText) {
        await action(id);
      } else {
        await confirmAction({
          action: () => action(id),
          confirmText,
        });
      }
    } catch (e) {
      toast({
        title: "Błąd",
        description: `${errorText}, ${e}`,
        variant: "error",
      });
    }
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <FullscreenLoader />}

      <div className="w-full flex gap-4 justify-around sm:justify-start">
        {buttons
          .filter(({ isDisplayed }) => isDisplayed)
          .map(({ text, action, errorText, confirmText = "" }, idx) => (
            <Button
              key={idx}
              message={text}
              variant="primary-rounded"
              onClickAction={() =>
                triggerAction(action, props.topic._id, errorText, confirmText)
              }
            />
          ))}
      </div>

      {showPostForm && (
        <AddPostForm
          topicId={props.topic._id}
          setShowPostForm={setShowPostForm}
        />
      )}
    </div>
  );
};

export default TopicActionButtons;
