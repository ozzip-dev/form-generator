import { use } from "react";
import { useProtocol } from "@/context/ProtocolContext";
import { ProtocolAttachmentCategory } from "@/types/protocol";
import { fileCategories, mapFileCategory } from "../../utils";
import ProtocolAttachedFile from "./ProtocolAttachedFile";
import ProtocolUploadFileForm from "./ProtocolUploadFileForm";

type Props = {
  visibleCategory: ProtocolAttachmentCategory;
};

const ProtocolUploadsPanel = (props: Props) => {
  const { protocolPromise, filesPromise } = useProtocol();
  const protocol = use(protocolPromise);
  const files = use(filesPromise);

  if (!protocol || !files) {
    return <div>Nie znaleziono protokołu</div>;
  }

  const getFileById = (fileId: string) =>
    files.find((file) => file._id == fileId);

  return (
    <>
      {fileCategories.map((category) => (
        <div
          key={category}
          style={category != props.visibleCategory ? { display: "none" } : {}}
          className="md:grid md:grid-cols-2"
        >
          <div>
            <div className="pb-sm font-black">{mapFileCategory[category]}</div>

            {protocol.fileIds[category]?.map((fileId) => (
              <ProtocolAttachedFile
                key={fileId}
                file={getFileById(fileId)!}
                protocolId={protocol._id}
                fileCategory={category}
              />
            ))}
          </div>

          {!!protocol ? (
            <ProtocolUploadFileForm {...{ category, protocol }} />
          ) : (
            <div>Nie znaleziono protokołu</div>
          )}
        </div>
      ))}
    </>
  );
};

export default ProtocolUploadsPanel;
