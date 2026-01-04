import Results from "@/components/pages/results/Results";
import { isInputSubmittable } from "@/helpers/inputHelpers";
import { getAnonymousAnswers, getGroupedAnswersResults } from "@/lib/results";
import { getFormById } from "@/services/form-service";
import { getAllSubmissions } from "@/services/result-service";
import { Answers, GroupedAnswer, Submission } from "@/types/result";

type Props = { params: Promise<{ formId: string }> };

const FormResultsPage = async (props: Props) => {
  const { formId } = await props.params;
  const {
    inputs,
    title = "",
    description = "",
    type,
    createdAt,
  } = await getFormById(formId);
  const submittableInputs = inputs.filter(isInputSubmittable);

  const displayResults = async (
    selectedInputIds: string[]
  ): Promise<{
    results: GroupedAnswer[];
    submissionCount: number;
  }> => {
    "use server";
    const submissions: Submission[] = await getAllSubmissions(formId);
    const filteredInputs = submittableInputs.filter((input) =>
      selectedInputIds.includes(input.id!)
    );

    const answers: Answers[] = getAnonymousAnswers(
      submissions,
      selectedInputIds
    );

    const groupedResults: GroupedAnswer[] = getGroupedAnswersResults(
      filteredInputs,
      answers
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
