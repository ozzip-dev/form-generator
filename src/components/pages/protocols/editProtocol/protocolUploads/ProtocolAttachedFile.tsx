import { removeProtocolFileAction } from "@/actions/protocol";
import { Button, IconTrash } from "@/components/shared";
import { useModal } from "@/context/ModalContextProvider";
import { useToast } from "@/context/ToastProvider";
import { confirmAction } from "@/helpers/confirmAction";
import { FileSerialized } from "@/types/file";
import { ProtocolFileCategory } from "@/types/protocol";

type Props = {
  file: Partial<FileSerialized>;
  protocolId: string;
  fileCategory: ProtocolFileCategory;
};

const ProtocolAttachedFile = (props: Props) => {
  const { toast } = useToast();
  const { openModal } = useModal();

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

  return (
    <div className="w-fit py-2 flex gap-4 items-center">
      <div>{props.file.name}</div>
      <Button
        type="button"
        icon={<IconTrash size={27} />}
        variant="ghost"
        onClickAction={() =>
          openModal({ action: printModal, header: "Usunąć dokument?" })
        }
      />
    </div>
  );
};

export default ProtocolAttachedFile;
