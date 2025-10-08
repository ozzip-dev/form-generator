import CreateFormMenu from "@/components/pages/create-form/CreateFormMenu";

export default async function CreateFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CreateFormMenu />
      <section>{children}</section>
    </>
  );
}
