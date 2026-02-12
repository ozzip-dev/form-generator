import ResultsNavMenu from "@/components/pages/results/ResultsNavMenu";

type Props = { params: Promise<{ formId: string }>; children: React.ReactNode };

export default async function ResultLayout(props: Props) {
  const { formId } = await props.params;

  return (
    <div className="flex h-full flex-col">
      <div className="container shrink-0">
        <ResultsNavMenu formId={formId} />
      </div>

      <section className="flex-1 overflow-y-auto">{props.children}</section>
    </div>
  );
}
