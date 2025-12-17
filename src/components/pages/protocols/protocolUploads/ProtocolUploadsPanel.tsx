import { addProtocolFileAction } from "@/actions/protocol/addProtocolFileAction";
import UploadFileForm from "@/components/shared/UploadFileForm";
import { useProtocol } from "@/context/ProtocolContext";
import { ProtocolFileCategory } from "@/types/protocol";
import { use, useState, useTransition } from "react";
import { fileCategories, mapFileCategory } from "../utils";
import ProtocolAttachedFile from "./ProtocolAttachedFile";
import { FullscreenLoader } from "@/components/shared";

type Props = {
  visibleCategory: ProtocolFileCategory;
};

const ProtocolUploadsPanel = (props: Props) => {
  const [isGlobalLoader, setGlobalLoader] = useState(false);
  const { protocolPromise, filesPromise } = useProtocol();
  const protocol = use(protocolPromise);
  const files = use(filesPromise);

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

  return (
    <>
      {isGlobalLoader && <FullscreenLoader />}
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
