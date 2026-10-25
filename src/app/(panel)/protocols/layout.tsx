import ProtocolsMenu from "@/components/pages/protocols/ProtocolsMenu";

type Props = {
  children: React.ReactNode;
};

export default async function ProtocolsLayout(props: Props) {
  return (
    <div className="flex h-full flex-col">
      <div className="container shrink-0 bg-white">
        <ProtocolsMenu />
      </div>

      <section className="flex-1 overflow-y-auto">{props.children}</section>
    </div>
  );
}
