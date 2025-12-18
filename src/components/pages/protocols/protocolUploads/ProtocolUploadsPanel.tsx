import { addProtocolFileAction } from "@/actions/protocol/addProtocolFileAction";
import { FullscreenLoader } from "@/components/shared";
import UploadFileForm from "@/components/shared/UploadFileForm";
import { useProtocol } from "@/context/ProtocolContext";
import { ProtocolFileCategory } from "@/types/protocol";
import { use, useState } from "react";
import { fileCategories, mapFileCategory } from "../utils";
import ProtocolAttachedFile from "./ProtocolAttachedFile";
import { useQueryState } from "nuqs";
import ModalWrapper from "@/components/shared/ModalWrapper";
import DeleteDocumentConformation from "../protocolsList/DeleteDocumentConformation";

type Props = {
  visibleCategory: ProtocolFileCategory;
};

const ProtocolUploadsPanel = (props: Props) => {
  const [isGlobalLoader, setGlobalLoader] = useState(false);
  const [modal, setModal] = useQueryState("modal");
  const { protocolPromise, filesPromise } = useProtocol();
  const protocol = use(protocolPromise);
  const files = use(filesPromise);
  const [isModalOpen, setModalOpen] = useState(false);

  if (!protocol || !files) {
    return <div>Nie znaleziono protokołu</div>;
  }

  const onProtocolFileUploaded = async (
    fileId: string,
    category: ProtocolFileCategory
  ) => {
    await addProtocolFileAction({
      protocolId: protocol._id,
      fileId,
      fileCategory: category,
    });
  };

  const getFileById = (fileId: string) =>
    files.find((file) => file._id == fileId);

  const handlePrintModal = () => {
    setModal(null);
  };

  console.log("modal", modal);

  return (
    <>
      {isGlobalLoader && <FullscreenLoader />}
      {modal === "delete" && (
        <div>
          <ModalWrapper isOpen={!!modal} onClose={handlePrintModal}>
            <DeleteDocumentConformation setModalOpen={setModalOpen} />
          </ModalWrapper>
        </div>
      )}

      {fileCategories.map((category) => (
        <div
          key={category}
          className={category != props.visibleCategory ? "!hidden" : ""}
        >
          <div className="font-black">{mapFileCategory[category]}</div>
          <div>
            liczba załączników: {protocol.fileIds[category]?.length || 0}
          </div>
          {protocol.fileIds[category]?.map((fileId) => (
            <ProtocolAttachedFile
              key={fileId}
              file={getFileById(fileId)!}
              protocolId={protocol._id}
              fileCategory={category}
              setGlobalLoader={setGlobalLoader}
            />
          ))}
          <UploadFileForm
            category={category}
            onFileUpload={onProtocolFileUploaded}
          />
        </div>
      ))}
    </>
  );
};

export default ProtocolUploadsPanel;
