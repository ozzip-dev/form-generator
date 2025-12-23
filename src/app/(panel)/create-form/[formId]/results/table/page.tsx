import ResultsTable from "@/components/pages/results/ResultsTable";

type Props = { params: Promise<{ formId: string }> };

const FormResultsTablePage = async (props: Props) => {
  const { formId } = await props.params;

  return <ResultsTable formId={formId} />;
};

export default FormResultsTablePage;
