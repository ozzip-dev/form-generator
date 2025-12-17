import { ProtocolContextProvider } from "@/context/ProtocolContext";
import { getFilesByFileIdsNoData } from "@/services/file-service";
import { getProtocolById } from "@/services/protocol-service";

type Props = {
  children: React.ReactNode;
  params: Promise<{ protocolId: string }>;
};

export default async function EditProtocolLayout(props: Props) {
  const { protocolId } = await props.params;

  const protocolPromise = getProtocolById(protocolId);

  const protocol = await protocolPromise;

  const fileIds = protocol?.fileIds
    ? Object.values(protocol.fileIds).flat()
    : [];

  const filesPromise = getFilesByFileIdsNoData(fileIds);

  return (
    <ProtocolContextProvider
      protocolPromise={protocolPromise}
      filesPromise={filesPromise}
    >
      <section>{props.children}</section>
    </ProtocolContextProvider>
  );
}
