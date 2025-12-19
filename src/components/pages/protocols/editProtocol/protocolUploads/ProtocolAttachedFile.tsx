import { removeProtocolFileAction } from "@/actions/protocol/removeProtocolFile.Action";
import { Button } from "@/components/shared";
import { confirmAction } from "@/helpers/confirmAction";
import { useToast } from "@/hooks/useToast";
import IconTrash from "@/icons/iconTrash/IconTrash";
import { FileSerialized } from "@/types/file";
import { ProtocolFileCategory } from "@/types/protocol";

type Props = {
  file: Partial<FileSerialized>;
  protocolId: string;
  fileCategory: ProtocolFileCategory;
};

const ProtocolAttachedFile = (props: Props) => {
  const { toast } = useToast();

  const printModal = async () => {
    try {
      const { protocolId, file, fileCategory } = props;
      // TODO: przemyslec czy nie przeniesść toast do confirm modal
      // i dać opcjonalne propsy z tekstem
      await removeProtocolFileAction(
        protocolId,
        file._id as string,
        fileCategory
      );
      toast({
        title: "Sukces",
        description: "Dokument usuniety",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: `Dokument nie został usuniety. ${error}`,
        variant: "error",
      });
    }
  };

  const onRemoveFile = async () => {
    await confirmAction(printModal, "Czy na pewno usunąć wybrany plik?");
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
