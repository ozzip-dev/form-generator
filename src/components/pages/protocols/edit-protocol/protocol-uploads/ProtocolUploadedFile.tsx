import Image from "next/image";
import { removeProtocolFileAction } from "@/actions/protocol";
import { Button, FullscreenLoader, Icon } from "@/components/shared";
import { useModal } from "@/context/ModalContextProvider";
import { useToast } from "@/context/ToastProvider";
import { getSerializedFileByIdAction } from "@/actions/file/getSerializedFileByIdAction";
import { getFileBlob, isImageType } from "@/helpers/fileHelpers";
import { downloadFile } from "@/lib/utils";
import { FileSerialized } from "@/types/file";
import { ProtocolAttachmentCategory } from "@/types/protocol";
import { useState } from "react";
import { openProtocolImagePreviewModal } from "../../protocol-image-preview";

type Props = {
  file: Partial<FileSerialized>;
  protocolId: string;
  fileCategory: ProtocolAttachmentCategory;
};

const ProtocolUploadedFile = (props: Props) => {
  const { toast } = useToast();
  const { openModal } = useModal();
  const { protocolId, file, fileCategory } = props;
  const [isFileLoading, setIsFileLoading] = useState(false);

  const handleFileNameClick = async () => {
    if (!file._id) return;

    setIsFileLoading(true);

    try {
      const serialized = await getSerializedFileByIdAction(file._id);

      if (!serialized) {
        toast({
          title: "Błąd",
          description: "Nie udało się pobrać pliku.",
          variant: "error",
        });
        return;
      }

      if (isImageType(serialized.type)) {
        openProtocolImagePreviewModal(openModal, serialized);
        return;
      }

      const blob = getFileBlob(serialized as FileSerialized);
      if (!blob) {
        toast({
          title: "Błąd",
          description: "Nie udało się przygotować pliku do pobrania.",
          variant: "error",
        });
        return;
      }

      downloadFile(blob, serialized.name || "downloaded_file");
    } finally {
      setIsFileLoading(false);
    }
  };

  const removeFile = async () => {
    try {
      // TODO: przemyslec czy nie przeniesść toast do confirm modal
      // i dać opcjonalne propsy z tekstem
      await removeProtocolFileAction(
        protocolId,
        file._id as string,
        fileCategory,
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
    <div className="flex w-fit items-center gap-4 py-2">
      {isFileLoading && <FullscreenLoader />}
      <button
        type="button"
        onClick={handleFileNameClick}
        disabled={isFileLoading}
        className="text-left underline decoration-accent underline-offset-2 hover:text-accent_dark"
      >
        {props.file.name}
      </button>

      <Button
        type="button"
        icon={<Icon icon="trash" size={27} className="bg-font_dark" />}
        variant="ghost"
        ariaLabel="Usuń załącznik"
        onClickAction={() =>
          openModal({
            action: removeFile,
            header: "Usunąć dokument?",
            confirmBtnMessage: "Usuń",
          })
        }
      />
    </div>
  );
};

export default ProtocolUploadedFile;
