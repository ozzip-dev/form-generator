import CreateFormMenu from "@/components/pages/create-form/CreateFormMenu";

type Props = { params: Promise<{ formId: string }> };
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
