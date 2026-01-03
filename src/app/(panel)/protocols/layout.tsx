import ProtocolsMenu from "@/components/pages/protocols/ProtocolsMenu";

type Props = {
  children: React.ReactNode;
};

export default async function ProtocolsLayout(props: Props) {
  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 container">
        <ProtocolsMenu />
      </div>
      <section className="flex-1">{props.children}</section>
    </div>
  );
}
