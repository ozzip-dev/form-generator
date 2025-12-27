import { removePostAction } from "@/actions/forum/removePostAction";
import { Button, DataLoader } from "@/components/shared";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { useToast } from "@/context/ToastProvider";
import IconTrash from "@/icons/iconTrash/IconTrash";
import { PostSerializedDetailed } from "@/types/forum";
import { use, useState } from "react";
import { useUser } from "@/context/UserContextProvider";
import { UserSerialized } from "@/types/user";
import { isItemAuthor } from "@/helpers/forumHelpers";

type Props = {
  post: PostSerializedDetailed;
};

const TopicPostItem = (props: Props) => {
  const [isPending, setPending] = useState<boolean>(false);
  const { toast } = useToast();
  const { userPromise } = useUser();
  const user: UserSerialized | null = use(userPromise);

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
    <div className="mb-8">
      {isPending && (
        <div className="absolute bg-red/50 backdrop-blur-sm w-100 inset-0 flex justify-center items-center">
          <DataLoader />
        </div>
      )}
      <div className="flex gap-2 items-center">
        <div className="text-sm">({formatDateAndTime(createdAt)})</div>
        {isAuthor && (
          <Button
            type="button"
            icon={<IconTrash style="h-5 w-5 bg-white" />}
            className="!w-12 !bg-red-600"
            onClickAction={onRemovePost}
          />
        )}
      </div>
      <div>
        autor: <b>{authorName}</b>
      </div>
      <div>
        treść: <b>{content}</b>
      </div>
    </div>
  );
};

export default TopicPostItem;
