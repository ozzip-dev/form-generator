import EditProtocol from "@/components/pages/protocols/editProtocol/EditProtocol";
import { getFilesByFileIdsNoData } from "@/services/file-service";
import { getProtocolById } from "@/services/protocol-service";
import { Protocol, ProtocolFileCategory } from "@/types/protocol";
import { serializeProtocol } from "@/lib/serialize-utils";
import ProtocolFileUploads from "@/components/pages/protocols/ProtocolFileUploads";
import { addProtocolFileAction } from "@/actions/protocol/addProtocolFileAction";

const EditProtocolPage = async ({
  params,
}: {
  params: Promise<{ protocolId: string }>;
}) => {
  const { protocolId } = await params;

  const protocol = await getProtocolById(protocolId);

  const fieldIdArray = protocol.fileIds
    ? Object.keys(protocol.fileIds)
        .map((key) => protocol.fileIds[key as ProtocolFileCategory])
        .flat()
    : [];

  const files = await getFilesByFileIdsNoData(fieldIdArray);

  const addFile = async (
    protocolId: string,
    category: ProtocolFileCategory,
    fileId: string
  ) => {
    "use server";
    await addProtocolFileAction({ protocolId, fileId, fileCategory: category });
  };

  console.log("files", files);

  return (
    <div className="p-4">
      <EditProtocol protocol={serializeProtocol(protocol)} files={files} />

      <ProtocolFileUploads
        id={protocolId}
        files={files}
        fileIds={protocol.fileIds}
        addFile={addFile}
      />
    </div>
  );
};

export default EditProtocolPage;
