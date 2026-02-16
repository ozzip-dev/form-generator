import NoResultsInfo from "@/components/pages/results/NoResultsInfo";
import Results from "@/components/pages/results/Results";
import { getSortedInputs } from "@/helpers/formHelpers";
import { isInputDisplayedInResults } from "@/helpers/inputHelpers";
import { getAnonymousAnswers, getGroupedAnswersResults } from "@/lib/results";
import { getFormById } from "@/services/form-service";
import { formHasResults, getAllSubmissions } from "@/services/result-service";
import { Answers, GroupedAnswer, Submission } from "@/types/result";

type Props = { params: Promise<{ formId: string }> };

const FormResultsPage = async (props: Props) => {
  const { formId } = await props.params;
  const form = await getFormById(formId);
  const { title = "", description = "", type, createdAt } = form;

  const hasResults = await formHasResults(formId);
  if (!hasResults) return <NoResultsInfo />;

  const submittableInputs = getSortedInputs(form).filter(
    isInputDisplayedInResults,
  );

  const displayResults = async (
    selectedInputIds: string[],
  ): Promise<{
    results: GroupedAnswer[];
    submissionCount: number;
  }> => {
    "use server";
    const submissions: Submission[] = await getAllSubmissions(formId);
    const filteredInputs = submittableInputs.filter((input) =>
      selectedInputIds.includes(input.id!),
    );

    const answers: Answers[] = getAnonymousAnswers(
      submissions,
      selectedInputIds,
    );

    const groupedResults: GroupedAnswer[] = getGroupedAnswersResults(
      filteredInputs,
      answers,
    );

    return { results: groupedResults, submissionCount: submissions.length };
  };

  return (
    <Results
      {...{
        inputs: submittableInputs,
        displayResults,
        formData: {
          title,
          description,
          type,
          createdAt: createdAt.toISOString(),
        },
      }}
    />
  );
};

export default FormResultsPage;
