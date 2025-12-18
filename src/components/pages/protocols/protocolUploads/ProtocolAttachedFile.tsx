import { removeProtocolFile } from "@/actions/protocol/removeProtocolFile";
import { Button } from "@/components/shared";
import { useToast } from "@/hooks/useToast";
import IconTrash from "@/icons/iconTrash/IconTrash";
import { FileSerialized } from "@/types/file";
import { ProtocolFileCategory } from "@/types/protocol";
import { useQueryState } from "nuqs";
import { Dispatch, SetStateAction } from "react";

type Props = {
  file: Partial<FileSerialized>;
  protocolId: string;
  fileCategory: ProtocolFileCategory;
  setGlobalLoader: Dispatch<SetStateAction<boolean>>;
};

const ProtocolAttachedFile = (props: Props) => {
  const { toast } = useToast();
  const [, setModal] = useQueryState("modal");

  const onRemoveFile = async () => {
    setModal("delete");

    // try {
    //   props.setGlobalLoader(true);
    //   await removeProtocolFile(
    //     props.protocolId,
    //     props.file._id!,
    //     props.fileCategory
    //   );
    //   toast({
    //     title: "Sukces",
    //     description: "Dokument usuniety",
    //     variant: "success",
    //   });
    // } catch (error) {
    //   toast({
    //     title: "Błąd",
    //     description: `Dokument nie został usuniety. ${error}`,
    //     variant: "error",
    //   });
    // } finally {
    //   props.setGlobalLoader(false);
    // }
  };

  return (
    <div className="flex gap-4 items-center">
      <div>{props.file.name}</div>
      <Button
        type="button"
        icon={<IconTrash style="h-5 w-5 bg-white" />}
        className="!w-12 !bg-red-600"
        onClickAction={onRemoveFile}
      />
    </div>
  );
};

export default ProtocolAttachedFile;
