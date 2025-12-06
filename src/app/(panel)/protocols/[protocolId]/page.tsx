import Protocols from "@/components/pages/protocols/Protocols";
import { db } from "@/lib/mongo";
import { serializeProtocol } from "@/lib/serialize-utils";
import { getProtocols } from "@/services/protocol-service";
import { Protocol, ProtocolSerialized } from "@/types/protocol";

const EditProtocolPage = async ({ params }: { params: Promise<{ protocolId: string }> }) => {
  const { protocolId } = await params
  // const protocols: Protocol[] = await getProtocols(db);
  // // TODO: fix serialization
  // const serializedProtocols: ProtocolSerialized[] = protocols.map((item) =>
  //   serializeProtocol(item)
  // );
  return <div>{protocolId}</div>;
};

export default EditProtocolPage;
