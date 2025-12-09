import ProtocolsMenu from "@/components/pages/protocols/ProtocolsMenu";

type Props = { children: React.ReactNode, params: Promise<{ protocolId: string }> };

export default async function ProtocolsLayout(props: Props) {
  const { protocolId } = await props.params

  return (
    <>
      <ProtocolsMenu protocolId={protocolId} />
      <section>{props.children}</section>
    </>
  );
}
