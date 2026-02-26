import NoResultsInfo from "@/components/pages/results/NoResultsInfo";
import Results from "@/components/pages/results/Results";
import { getSortedInputs, isUserAuthor } from "@/helpers/formHelpers";
import { isInputDisplayedInResults } from "@/helpers/inputHelpers";
import { getAnonymousAnswers, getGroupedAnswersResults } from "@/lib/results";
import { serializeResultSubmission } from "@/lib/serialize-utils";
import { getFormById } from "@/services/form-service";
import { formHasResults, getAllSubmissions } from "@/services/result-service";
import { requireUser } from "@/services/user-service";
import { Answers, GroupedAnswer, SubmissionSerialized } from "@/types/result";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ formId: string }> };

const FormResultsPage = async (props: Props) => {
  const { formId } = await props.params;
  const form = await getFormById(formId);

  // TODO Pawel: move to middleware
  const user = await requireUser();
  if (!isUserAuthor(form, user.id)) redirect(`/forms/${formId}/preview`);

  const { title = "", description = "", type, createdAt } = form;
  const submissions: SubmissionSerialized[] =
    (await getAllSubmissions(formId as string))?.map(
      serializeResultSubmission,
    ) || [];
  const hasResults = await formHasResults(formId);
  if (!hasResults) return <NoResultsInfo />;

  const submittableInputs = getSortedInputs(form).filter(
    isInputDisplayedInResults,
  );

  const submissionNumber = submissions.length;

  const displayResults = async (
    selectedInputIds: string[],
  ): Promise<{
    results: GroupedAnswer[];
    submissionCount: number;
  }> => {
    "use server";

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
        submissionNumber,
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
