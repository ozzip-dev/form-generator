import ForumMenu from "@/components/pages/forum/ForumMenu";

type Props = {
  children: React.ReactNode;
};

export default async function ForumLayout(props: Props) {
  return (
    <div className="flex h-full flex-col">
      <div className="borer-b shrink-0 border-gray bg-white">
        <ForumMenu />
      </div>

      <section className="flex-1 overflow-y-auto">{props.children}</section>
    </div>
  );
}
