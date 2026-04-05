import Protocols from "@/components/pages/protocols/protocols-list/Protocols";
import { db } from "@/lib/mongo";
import { serializeProtocol } from "@/lib/serialize-utils";
import { getProtocols } from "@/services/protocol-service";
import { Protocol, ProtocolSerialized } from "@/types/protocol";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formy pracy - Lista protokołów",
};

const PageProtocolsList = async () => {
  const protocols: Protocol[] = await getProtocols(db);
  const serializedProtocols: ProtocolSerialized[] =
    protocols.map(serializeProtocol);
  return <Protocols protocols={serializedProtocols} />;
};

export default PageProtocolsList;
