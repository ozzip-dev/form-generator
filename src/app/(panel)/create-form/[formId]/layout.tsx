import CreateFormMenu from "@/components/pages/create-form/CreateFormMenu";

type Props = { params: Promise<{ formId: string }>; children: React.ReactNode };

export default async function CreateFormLayout(props: Props) {
  const { formId } = await props.params;

  return (
    <>
      <CreateFormMenu formId={formId} />
      <section>{props.children}</section>
    </>
  );
}
