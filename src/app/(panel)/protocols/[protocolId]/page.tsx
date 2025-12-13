import EditProtocol from "@/components/pages/protocols/editProtocol/EditProtocol";
import { getFilesByFileIdsNoData } from "@/services/file-service";
import { getProtocolById } from "@/services/protocol-service";
import { Protocol, ProtocolFileCategory } from "@/types/protocol";
import { serializeProtocol } from "@/lib/serialize-utils";

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

  return (
    <div className="p-4">
      <EditProtocol protocol={serializeProtocol(protocol)} files={files} />
    </div>
  );
};

export default EditProtocolPage;
