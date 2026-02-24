import { removePostAction } from "@/actions/forum/removePostAction";
import { Button, DataLoader, IconTrash } from "@/components/shared";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { useToast } from "@/context/ToastProvider";
import { PostSerializedDetailed } from "@/types/forum";
import { use, useState } from "react";
import { useUser } from "@/context/UserContextProvider";
import { UserSerialized } from "@/types/user";
import { isItemAuthor } from "@/helpers/forumHelpers";
import { useModal } from "@/context/ModalContextProvider";

type Props = {
  post: PostSerializedDetailed;
};

const TopicPostItem = (props: Props) => {
  const [isPending, setPending] = useState<boolean>(false);
  const { toast } = useToast();
  const { userPromise } = useUser();
  const user: UserSerialized | null = use(userPromise);
  const { openModal } = useModal();

  const { content, createdAt, _id, authorName } = props.post;
  const onRemovePost = async () => {
    setPending(true);

    try {
      await removePostAction(_id);

      toast({
        title: "Sukces",
        description: "Post usuniety",
        variant: "success",
      });
    } catch (error) {
      setPending(false);
      toast({
        title: "Błąd",
        description: `Post nie został usuniety. ${error}`,
        variant: "error",
      });
    }

    setPending(false);
  };

  const isAuthor = !!(user && isItemAuthor(user, props.post));

  return (
    <div className="pt-sm">
      {isPending && (
        <div className="bg-red/50 w-100 absolute inset-0 flex items-center justify-center backdrop-blur-sm">
          <DataLoader />
        </div>
      )}
      <div className="flex items-center gap-2">
        <div className="text-sm">({formatDateAndTime(createdAt)})</div>
        {isAuthor && (
          <Button
            type="button"
            icon={<IconTrash />}
            variant="ghost"
            ariaLabel="Usuń post"
            onClickAction={() =>
              openModal({
                action: onRemovePost,
                header: "Czy na pewno usunąć?",
                confirmBtnMessage: "Usuń",
              })
            }
          />
        )}
      </div>
      <div>
        autor: <b>{authorName}</b>
      </div>
      <div>treść: {content}</div>
    </div>
  );
};

export default TopicPostItem;
