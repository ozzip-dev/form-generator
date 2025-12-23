import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { isInputSubmittable } from "@/helpers/inputHelpers";
import { getFormById } from "@/services/form-service";
import { getAllSubmissions } from "@/services/result-service";
import { Submission } from "@/types/result";

type Props = {
  formId: string;
};

const ResultsTable = async (props: Props) => {
  const form = await getFormById(props.formId);
  const submissions: Submission[] = await getAllSubmissions(props.formId);
  const submittableInputs = form.inputs.filter(isInputSubmittable);

  const getAnswerDisplay = (value: string | Record<string, string>): string => {
    if (typeof value == "string") return value;
    return Object.values(value)
      .filter((val) => val)
      .join(", ");
  };

  return (
    <div>
      <table>
        <thead>
          <tr className="*:p-2">
            <th>Data wysłania</th>
            {submittableInputs.map(({ header }, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {submissions.map(({ answers, submittedAt }, idx) => (
            <tr key={idx} className="*:p-2">
              <td>{formatDateAndTime(submittedAt.toISOString())}</td>
              {Object.entries(answers).map(([_, value], index) => (
                <td key={index}>{getAnswerDisplay(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
