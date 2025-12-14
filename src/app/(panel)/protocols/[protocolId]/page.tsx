import EditProtocol from "@/components/pages/protocols/editProtocol/EditProtocol";
import ProtocolFileUploads from "@/components/pages/protocols/protocolUploads/ProtocolFileUploads";
import SuspenseErrorBoundary from "@/components/shared/errors/SuspenseErrorBoundary";
import { serializeProtocol } from "@/lib/serialize-utils";
import { getFilesByFileIdsNoData } from "@/services/file-service";
import { getProtocolById } from "@/services/protocol-service";
import { ProtocolFileCategory } from "@/types/protocol";

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

  console.log("files", files);

  return (
    <div className="p-4">
      <SuspenseErrorBoundary size="lg" errorMessage="Brak danych protokołu">
        <EditProtocol />
      </SuspenseErrorBoundary>
      <SuspenseErrorBoundary size="lg" errorMessage="Brak plików">
        <ProtocolFileUploads files={files} />
      </SuspenseErrorBoundary>
    </div>
  );
};

export default EditProtocolPage;
