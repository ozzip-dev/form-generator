import ResultsNavMenu from "@/components/pages/results/ResultsNavMenu";

type Props = { params: Promise<{ formId: string }>; children: React.ReactNode };

export default async function ResultLayout(props: Props) {
  const { formId } = await props.params;

  return (
    <>
      <ResultsNavMenu formId={formId} />
      <section>{props.children}</section>
    </>
  );
}
