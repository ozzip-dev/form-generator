import Results from "@/components/pages/results/Results";
import { getFormInputs } from "@/services/form-service";
import { getAllSubmissions } from "@/services/result-service";
import { FormInput } from "@/types/input";
import { Submission } from "@/types/result";

type Props = { params: Promise<{ formId: string }> };

const FormResultsPage = async (props: Props) => {
  const { formId } = await props.params;
  const submissions: Submission[] = await getAllSubmissions(formId)
  const inputs: FormInput[] = await getFormInputs(formId)
  
  return <Results
    {...{inputs, submissions}}
  />
};

export default FormResultsPage;
