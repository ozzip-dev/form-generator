import Results from "@/components/pages/results/Results";
import { getAnonymousAnswers, getGroupedAnswersResults } from "@/lib/results";
import { getFormInputs } from "@/services/form-service";
import { getAllSubmissions } from "@/services/result-service";
import { FormInput } from "@/types/input";
import { Answers, GroupedAnswer, Submission } from "@/types/result";

type Props = { params: Promise<{ formId: string }> };

const FormResultsPage = async (props: Props) => {
  const { formId } = await props.params;
  const inputs = await getFormInputs(formId)
  
  const displayResults = async (selectedInputIds: string[]) => {
    "use server"
    const submissions: Submission[] = await getAllSubmissions(formId)
    const inputs: FormInput[] = await getFormInputs(formId)
    const filteredInputs = inputs.filter(({ id }) => selectedInputIds.includes(id!))
    const answers: Answers[] = getAnonymousAnswers(submissions, selectedInputIds)
    const groupedResults: GroupedAnswer[] = getGroupedAnswersResults(filteredInputs, answers)
    return groupedResults
  }
  
  return <Results
    {...{inputs, displayResults}}
  />
};

export default FormResultsPage;
