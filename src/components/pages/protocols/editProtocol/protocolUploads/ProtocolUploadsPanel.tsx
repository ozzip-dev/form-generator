import { addProtocolFileAction } from "@/actions/protocol/addProtocolFileAction";
import ModalWrapper from "@/components/shared/ModalWrapper";
import UploadFileForm from "@/components/shared/UploadFileForm";
import { useProtocol } from "@/context/ProtocolContext";
import { ProtocolFileCategory } from "@/types/protocol";
import { useQueryState } from "nuqs";
import { use } from "react";
import DeleteDocumentConformation from "../../protocolsList/DeleteDocumentConformation";
import { fileCategories, mapFileCategory } from "../../utils";
import ProtocolAttachedFile from "./ProtocolAttachedFile";

type Props = {
  visibleCategory: ProtocolFileCategory;
};

const ProtocolUploadsPanel = (props: Props) => {
  const [protocolId, setProtocolId] = useQueryState("protocolId");
  const [fileId, setFileId] = useQueryState("fileId");
  const [category, setCategory] = useQueryState("category");

  const { protocolPromise, filesPromise } = useProtocol();
  const protocol = use(protocolPromise);
  const files = use(filesPromise);

  if (!protocol || !files) {
    return <div>Nie znaleziono protokołu</div>;
  }

  const getFileById = (fileId: string) =>
    files.find((file) => file._id == fileId);

  const handleCloseModal = () => {
    setProtocolId(null);
    setFileId(null);
    setCategory(null);
  };
  const isDeleteModalOpen = !!protocolId && !!fileId && !!category;
  return (
    <>
      {isDeleteModalOpen && (
        <ModalWrapper isOpen={!!protocolId} onClose={handleCloseModal}>
          <DeleteDocumentConformation />
        </ModalWrapper>
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
            />
          ))}
          <UploadFileForm category={category} />
        </div>
      ))}
    </>
  );
};

export default ProtocolUploadsPanel;
