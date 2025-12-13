import ProtocolsMenu from "@/components/pages/protocols/ProtocolsMenu";

type Props = { children: React.ReactNode };

export default async function ProtocolsLayout(props: Props) {
  return (
    <>
      <ProtocolsMenu />
      <section>{props.children}</section>
    </>
  );
}
