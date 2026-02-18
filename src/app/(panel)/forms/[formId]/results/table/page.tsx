import NoResultsInfo from "@/components/pages/results/NoResultsInfo";
import { ResultsPdfTable } from "@/components/pages/results/ResultsPdfTable";
import ResultsTable from "@/components/pages/results/ResultsTable";
import SectionHeader from "@/components/shared/SectionHeader";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { getSortedInputs, isFormSecret } from "@/helpers/formHelpers";
import { isInputDisplayedInResults } from "@/helpers/inputHelpers";
import { getFormById } from "@/services/form-service";
import { formHasResults, getAllSubmissions } from "@/services/result-service";
import { Answers, Submission } from "@/types/result";

type Props = { params: Promise<{ formId: string }> };

const FormResultsTablePage = async (props: Props) => {
  const { formId } = await props.params;
  const form = await getFormById(formId);
  const { title = "", createdAt, resultVisibility } = form;

  if (resultVisibility !== "open")
    return (
      <div className="mt-20 text-center text-lg">
        Tryb formularza tajny. Brak dostępu do szczegółowych wyników
      </div>
    );

  const hasResults = await formHasResults(formId);
  if (!hasResults) return <NoResultsInfo />;

  const submissions: Submission[] = await getAllSubmissions(formId);
  const submittableInputs = getSortedInputs(form).filter(
    isInputDisplayedInResults,
  );

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

  const getAnswerValues = (answers: Answers): string[] =>
    Object.entries(answers).map(([_, value]) => getAnswerDisplay(value));

  const getVisibleAnswers = (answers: Answers) => {
    const hiddenInputIds = form.inputs
      .filter(({ hidden }) => hidden)
      .map(({ id }) => id);
    hiddenInputIds.forEach((id) => {
      if (id && answers[id]) delete answers[id];
    });
    return answers;
  };

  const submissionValues: string[][] = submissions.map(
    ({ answers, submittedAt }) => {
      const displayedAnswers = getAnswerValues(getVisibleAnswers(answers));
      return isFormSecret(form)
        ? displayedAnswers
        : [formatDateAndTime(submittedAt!.toISOString()), ...displayedAnswers];
    },
  );

  const submissionsSum = submissionValues.length.toString();

  const headerValues: string[] = submittableInputs.map(({ header }) => header);
  const inputHeaders: string[] = [submissionsSum, "Wysłany", ...headerValues];

  return (
    <>
      <SectionHeader
        className="mx-8 my-6 min-w-max"
        message={
          <>
            <div>{title} </div>
            <div className="text-center text-2xs text-font_light sm:text-left">
              <span className="mr-1"> Opublikowany:</span>
              {formatDateAndTime(createdAt.toString())}
            </div>
          </>
        }
      />

      <ResultsTable {...{ inputHeaders, submissionValues }} />

      <ResultsPdfTable
        {...{
          inputHeaders,
          submissionValues,
          title: form.title || "formularz",
        }}
      />
    </>
  );
};

export default FormResultsTablePage;
