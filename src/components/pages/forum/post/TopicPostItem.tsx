import { removePostAction } from "@/actions/forum/removePostAction";
import { Button, DataLoader } from "@/components/shared";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { useToast } from "@/context/ToastProvider";
import IconTrash from "@/icons/iconTrash/IconTrash";
import { PostSerialized } from "@/types/forum";
import { useState } from "react";

type Props = {
  post: PostSerialized;
};

const TopicPostItem = (props: Props) => {
  const [isPending, setPending] = useState<boolean>(false);
  const { toast } = useToast();

  const { content, createdAt, _id } = props.post;
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
  return (
    <div className="flex gap-2 items-center">
      {isPending && (
        <div className="absolute bg-red/50 backdrop-blur-sm w-100 inset-0 flex justify-center items-center">
          <DataLoader />
        </div>
      )}
      <div>{content}</div>
      <div className="text-sm">({formatDateAndTime(createdAt)})</div>
      <Button
        type="button"
        icon={<IconTrash style="h-5 w-5 bg-white" />}
        className="!w-12 !bg-red-600"
        onClickAction={onRemovePost}
      />
    </div>
  );
};

export default TopicPostItem;
