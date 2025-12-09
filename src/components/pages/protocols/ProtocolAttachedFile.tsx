import { removeProtocolFile } from "@/actions/protocol/removeProtocolFile";
import { Button, DataLoader } from "@/components/shared";
import { useToast } from "@/hooks/useToast";
import IconTrash from "@/icons/iconTrash/IconTrash";
import { FileSerialized } from "@/types/file";
import { ProtocolFileCategory } from "@/types/protocol";
import { useState } from "react";

type Props = {
  file: Partial<FileSerialized>
  protocolId: string
  fileCategory: ProtocolFileCategory
}

const ProtocolAttachedFile = ({ file, protocolId, fileCategory } : Props) => {
  const [isPending, setPending] = useState<boolean>(false);
  const { toast } = useToast()  
  const onRemoveFile = async () => {
    setPending(true);

    try {
      await removeProtocolFile(
        protocolId,
        file._id!,
        fileCategory
      )

      toast({
        title: "Sukces",
        description: "Dokument usuniety",
        variant: "success",
      });
    } catch (error) {
      setPending(false);
      toast({
        title: "Błąd",
        description: `Dokument nie został usuniety. ${error}`,
        variant: "error",
      });
    }

    setPending(false);
  }

  return (
    <div className="flex gap-4 items-center">
      {isPending && (
        <div className="absolute bg-red/50 backdrop-blur-sm w-100 inset-0 flex justify-center items-center">
          <DataLoader />
        </div>
      )}
      <div>{file.name}</div>
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
