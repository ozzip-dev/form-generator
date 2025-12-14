import { ProtocolFileCategory } from "@/types/protocol";
import { Dispatch, SetStateAction, use } from "react";
import ProtocolAttachedFile from "./ProtocolAttachedFile";
import UploadFileForm from "@/components/shared/UploadFileForm";
import { mapFileCategory } from "../utils";
import { addProtocolFileAction } from "@/actions/protocol/addProtocolFileAction";
import { useProtocol } from "@/context/ProtocolContext";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { FileSerialized } from "@/types/file";

const fileCategories: ProtocolFileCategory[] = [
  "demands",
  "mediationMeetings",
  "mediationDiscrepancy",
  "negotiationMeetings",
  "negotiationDiscrepancy",
  "agreement",
  "other",
];

type Props = {
  visibleCategory: ProtocolFileCategory;
  files: Partial<FileSerialized>[];
};

const ProtocolUploadsPanel = (props: Props) => {
  const { protocolPromise } = useProtocol();
  const protocol = use(protocolPromise);
  const protocolId = useSafeURLParam("protocolId");
  if (!protocol) {
    return <div>Nie znaleziono protokołu</div>;
  }

  if (!protocolId) return;

  const onProtocolFileUploaded = async (
    fileId: string,
    category: ProtocolFileCategory
  ) => {
    await addProtocolFileAction({ protocolId, fileId, fileCategory: category });
  };

  const getFileById = (fileId: string) =>
    props.files.find((file) => file._id == fileId);

  return (
    <>
      {fileCategories.map((category, idx) => (
        <div
          key={idx}
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
              protocolId={protocolId}
              fileCategory={category}
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
