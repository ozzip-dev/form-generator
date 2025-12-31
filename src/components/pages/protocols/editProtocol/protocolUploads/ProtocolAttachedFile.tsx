import { removeProtocolFileAction } from "@/actions/protocol/removeProtocolFileAction";
import { Button } from "@/components/shared";
import { useModal } from "@/context/ModalContextProvider";
import { useToast } from "@/context/ToastProvider";
import { confirmAction } from "@/helpers/confirmAction";
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

  const onRemoveFile = async () => {
    await confirmAction({
      action: printModal,
      confirmText: "Czy na pewno usunąć wybrany plik?",
    });
  };

  return (
    <div className="flex gap-4 items-center">
      <div>{props.file.name}</div>
      <Button
        type="button"
        icon={<IconTrash style="h-10 w-8 bg-font_light" />}
        variant="icon"
        className="!w-12 !bg-red-600"
        onClickAction={onRemoveFile}
      />
      <button
        onClick={() =>
          openModal({ action: printModal, header: "Czy usunąć dokument?" })
        }
      >
        xxx
      </button>
    </div>
  );
};

export default ProtocolAttachedFile;
