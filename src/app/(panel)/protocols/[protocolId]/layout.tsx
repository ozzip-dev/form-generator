import { ProtocolContextProvider } from "@/context/ProtocolContext";
import { getProtocolById } from "@/services/protocol-service";

type Props = {
  children: React.ReactNode;
  params: Promise<{ protocolId: string }>;
};

export default async function EditProtocolLayout(props: Props) {
  const { protocolId } = await props.params;

  const protocolPromise = getProtocolById(protocolId);

  return (
    <ProtocolContextProvider protocolPromise={protocolPromise}>
      <section>{props.children}</section>
    </ProtocolContextProvider>
  );
}
