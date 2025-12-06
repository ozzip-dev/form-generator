import ProtocolDetails from "@/components/pages/protocols/ProtocolDetails";
import Protocols from "@/components/pages/protocols/Protocols";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { db } from "@/lib/mongo";
import { serializeProtocol } from "@/lib/serialize-utils";
import { getProtocolById, getProtocols } from "@/services/protocol-service";
import { Protocol, ProtocolSerialized } from "@/types/protocol";

const EditProtocolPage = async ({ params }: { params: Promise<{ protocolId: string }> }) => {
  const { protocolId } = await params
  const {
    branch,
    disputeReason,
    disputeStartDate,
    tradeUnionName,
    lastModifiedAt,
    uploadedAt,
    workplaceName
  } = await getProtocolById(protocolId)

  return (
    <div>
      <ProtocolDetails 
        {...{
          branch,
          disputeReason,
          disputeStartDate,
          tradeUnionName,
          lastModifiedAt,
          uploadedAt,
          workplaceName
        }}
      />    

    </div>
  );
};

export default EditProtocolPage;
