import DownloadResultsButton from "@/components/pages/results/DownloadResultsButton";
import NoResultsInfo from "@/components/pages/results/NoResultsInfo";
import ResultsTable from "@/components/pages/results/ResultsTable";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { isFormSecret } from "@/helpers/formHelpers";
import { isInputSubmittable } from "@/helpers/inputHelpers";
import { getFormById } from "@/services/form-service";
import { formHasResults, getAllSubmissions } from "@/services/result-service";
import { Answers, Submission } from "@/types/result";

type Props = { params: Promise<{ formId: string }> };

const FormResultsTablePage = async (props: Props) => {
  const { formId } = await props.params;

  const hasResults = await formHasResults(formId);
  if (!hasResults) return <NoResultsInfo />;

  const form = await getFormById(formId);
  const submissions: Submission[] = await getAllSubmissions(formId);
  const submittableInputs = form.inputs.filter(isInputSubmittable);

  const getAnswerDisplay = (value: string | Record<string, string>): string => {
    if (typeof value == "string") return value;
    try {
      return Object.values(value)
        .filter((val) => val)
        .join(", ");
    } catch (_) {
      return "[ nieprawidłowe dane ]";
    }
  };

  const headerValues: string[] = submittableInputs.map(({ header }) => header);
  const inputHeaders: string[] = isFormSecret(form)
    ? headerValues
    : ["Data wysłania", ...headerValues];

  const getAnswerValues = (answers: Answers): string[] =>
    Object.entries(answers).map(([_, value]) => getAnswerDisplay(value));
  const submissionValues: string[][] = submissions.map(
    ({ answers, submittedAt }) =>
      isFormSecret(form)
        ? getAnswerValues(answers)
        : [
            formatDateAndTime(submittedAt!.toISOString()),
            ...getAnswerValues(answers),
          ]
  );

  return (
    <>
      <ResultsTable {...{ inputHeaders, submissionValues }} />
      <DownloadResultsButton
        {...{ inputHeaders, submissionValues, formTitle: form.title }}
      />
    </>
  );
};

export default FormResultsTablePage;
