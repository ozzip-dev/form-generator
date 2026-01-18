import ForumMenu from "@/components/pages/forum/ForumMenu";

type Props = {
  children: React.ReactNode;
};

export default async function ForumLayout(props: Props) {
  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 container">
        <ForumMenu />
      </div>

      <section className="flex-1  overflow-y-auto">{props.children}</section>
    </div>
  );
}
