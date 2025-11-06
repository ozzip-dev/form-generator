import ProtocolsMenu from "@/components/pages/protocols/ProtocolsMenu";

type Props = { params: Promise<{ formId: string }>; children: React.ReactNode };

export default async function ProtocolsLayout(props: Props) {
  const { formId } = await props.params;

  return (
    <>
      <ProtocolsMenu />
      <section>{props.children}</section>
    </>
  );
}
